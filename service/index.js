const express = require("express");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");
const DB = require("./database.js");

const app = express();

const authCookieName = "token";

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve up the front-end static content hosting
app.use(express.static("public"));

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//***AUTH ENDPOINTS***
//register a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Existing User" });
    return;
  } else {
    const user = await createUser(req.body.username, req.body.password);

    await createProfile(user.username);

    // create auth cookie and send response
    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);

  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }

  res.status(204).end();
});

// Middle ware to verify auth
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

//***USER ENDPOINTS***
//get a user's profile
apiRouter.get("/profile/:username", verifyAuth, async (req, res) => {
  const user = await findUser("username", req.params.username);
  if (user) {
    const profile = await findUser(req.params.username);
    res.send(profile);
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

//update a user's profile
apiRouter.post("/profile/:username", verifyAuth, async (req, res) => {
  const user = await findUser("username", req.params.username);
  if (user && user === req.user) {
    const profile = await findProfile(req.params.username);
    profile.data = { ...profile.data, ...req.body.data };
    await DB.updateProfile(profile);
    res.send(profile);
  } else {
    res.status(403).send({ msg: "Unauthorized" });
  }
});

//review endpoints

apiRouter.get("/reviews", verifyAuth, async (req, res) => {
  res.send(await getReviews(req.user.username));
});

apiRouter.get("/reviews/:username", verifyAuth, async (req, res) => {
  const lookupUser = await findUser("username", req.params.username);
  if (!lookupUser) {
    res.status(404).send({ msg: "User not found" });
  } else {
    let userReviews = await getReviewsForUser(
      lookupUser.username,
      req.user.username
    );

    res.send(userReviews);
  }
});

apiRouter.post("/review/like", verifyAuth, async (req, res) => {
  const likerUsername = req.user.username;
  const reviewId = req.body.reviewId;
  const review = await DB.getReviewById(reviewId);
  let userHasLiked = false;
  if (!review) {
    res.status(404).send({ msg: "Review not found" });
  } else {
    if (!review.likedBy.includes(likerUsername)) {
      review.likedBy.push(likerUsername);
      userHasLiked = true;
    } else {
      review.likedBy = review.likedBy.filter((u) => u !== likerUsername);
      userHasLiked = false;
    }

    await DB.updateReview(review);
    res.send({
      num: review.likedBy.length,
      userHasLiked: userHasLiked,
    });
  }
});

apiRouter.post("/review", verifyAuth, async (req, res) => {
  const user = req.user;
  const review = {
    ...req.body,
    id: uuid.v4(),
    username: user.username,
    likedBy: [],
  };

  await DB.addReview;
  res.send(review);
});

//quotes endpoint
apiRouter.get("/quote", async (req, res) => {
  const randomQuote = await DB.getRandomQuote();
  res.send(randomQuote);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const token = uuid.v4();

  const user = new User(username, passwordHash, token);
  await DB.addUser(user);

  return user;
}

async function createProfile(username) {
  const profile = new Profile(username);
  await DB.addProfile(profile);

  return profile;
}

async function getReviewsForUser(lookupUsername, curUsername) {
  const reviews = await DB.getUserReviews(lookupUsername);
  return formatReviewsWithLikes(reviews, curUsername);
}

function formatReviewsWithLikes(reviews, username) {
  return reviews.map((review) => ({
    id: review.id,
    username: review.username,
    movieTitle: review.movieTitle,
    date: review.date,
    text: review.text,
    numLikes: review.likedBy.length,
    rating: review.rating,
    posterURL: review.posterURL,
    isLikedByCurUser: username ? review.likedBy.includes(username) : false,
  }));
}

async function getReviews(curUsername = null) {
  const reviews = await DB.getReviews();
  return formatReviewsWithLikes(reviews, curUsername);
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return await DB.getUserByToken(value);
  }

  return await DB.getUser(value);
}

async function findProfile(username) {
  return DB.findProfileByUsername(username);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

class User {
  username;
  password;
  token;

  constructor(username, password, token) {
    this.username = username;
    this.password = password;
    this.token = token;
  }
}

class Profile {
  username;
  data = {
    joinDate: null,
    firstName: null,
    lastName: null,
    quote: null,
    bioText: null,
  };
  constructor(username) {
    this.username = username;
    let date = new Date();
    this.data.joinDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  }
}
