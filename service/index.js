const express = require("express");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const cookieParser = require("cookie-parser");

const app = express();

const authCookieName = "token";

// users, profiles, reviews saved in memory and disappear when server restarts when service is restarted
let users = [];
let profiles = [];
let reviews = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
let apiRouter = express.Router();
app.use(`/api`, apiRouter);

//***AUTH ENDPOINTS***
//register a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Existing User" });
    return;
  } else {
    const user = await createUser(req.body.username, req.body.password);

    createProfile(user.username);

    // create auth cookie and send response

    setAuthCookie(res, user);
    res.send({ username: user.username });
  }
});

// login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = findUser("token", req.cookies[authCookieName]);

  clearAuthCookie(res, user);
  res.status(204).end();
});

// Middle ware to verify auth
const verifyAuth = async (req, res, next) => {
  const user = findUser("token", req.cookies[authCookieName]);
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
  const user = findUser("username", req.params.username);
  if (user) {
    const profile = findProfile(req.params.username);
    res.send(profile);
  } else {
    res.status(404).send({ msg: "User not found" });
  }
});

//update a user's profile
apiRouter.post("/profile/:username", verifyAuth, async (req, res) => {
  const user = findUser("username", req.params.username);
  if (user && user === req.user) {
    console.log(req);
    const profile = findProfile(req.params.username);
    profile.data = { ...profile.data, ...req.body.data };
    res.send(profile);
  } else {
    res.status(403).send({ msg: "Unauthorized" });
  }
});

//review endpoints

apiRouter.get("/reviews", verifyAuth, async (req, res) => {
  res.send(getReviews(req.user.username));
});

apiRouter.get("/reviews/:username", verifyAuth, async (req, res) => {
  const user = findUser("username", req.params.username);
  if (!user) {
    res.status(404).send({ msg: "User not found" });
  } else {
    let userReviews = getReviews(req.user.username).filter(
      (r) => r.username === user.username
    );

    res.send(userReviews);
  }
});

apiRouter.post("/review/like", verifyAuth, async (req, res) => {
  const likerUsername = req.user.username;
  const reviewId = req.body.reviewId;
  const review = reviews.find((r) => r.id === reviewId);
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

  reviews.push(review);
  res.send(review);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User(username, passwordHash);
  users.push(user);

  return user;
}

function createProfile(username) {
  const profile = new Profile(username);
  profiles.push(profile);

  return profile;
}

function getReviews(curUsername = null) {
  return reviews.map((review) => ({
    id: review.id,
    username: review.username,
    movieTitle: review.movieTitle,
    date: review.date,
    text: review.text,
    numLikes: review.likedBy.length,
    isLikedByCurUser: curUsername
      ? review.likedBy.includes(curUsername)
      : false,
  }));
}

function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function findProfile(username) {
  return profiles.find((p) => p.username === username);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, user) {
  user.token = uuid.v4();
  res.cookie(authCookieName, user.token, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

function clearAuthCookie(res, user) {
  delete user.token;
  res.clearCookie(authCookieName);
}

class User {
  username;
  password;

  constructor(username, password) {
    this.username = username;
    this.password = password;
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
