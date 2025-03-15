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

//quotes endpoint
apiRouter.get("/quote", async (req, res) => {
  const randomIndex = Math.floor(Math.random() * randomQuotes.length);
  res.send(randomQuotes[randomIndex]);
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
  return reviews
    .map((review) => ({
      id: review.id,
      username: review.username,
      movieTitle: review.movieTitle,
      date: review.date,
      text: review.text,
      numLikes: review.likedBy.length,
      rating: review.rating,
      posterURL: review.posterURL,
      isLikedByCurUser: curUsername
        ? review.likedBy.includes(curUsername)
        : false,
    }))
    .reverse();
}

function findUser(field, value) {
  if (!value) return null;

  if (field === "username") {
    return users.find((u) => u[field].toUpperCase() === value.toUpperCase());
  } else {
    return users.find((u) => u[field] === value);
  }
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

var randomQuotes = [
  {
    quote: "Frankly, my dear, I don’t give a damn.",
    movie: "Gone with the Wind (1939)",
  },
  {
    quote:
      "You don't understand! I coulda had class. I coulda been a contender. I could've been somebody, instead of a bum, which is what I am.",
    movie: "On the Waterfront (1954)",
  },
  {
    quote: "Toto, I've got a feeling we're not in Kansas anymore.",
    movie: "The Wizard of Oz (1939)",
  },
  { quote: "Here's looking at you, kid.", movie: "Casablanca (1942)" },
  { quote: "Go ahead, make my day.", movie: "Sudden Impact (1983)" },
  {
    quote: "All right, Mr. DeMille, I'm ready for my closeup.",
    movie: "Sunset Blvd. (1950)",
  },
  { quote: "May the Force be with you.", movie: "Star Wars (1977)" },
  {
    quote: "Fasten your seatbelts. It's going to be a bumpy night.",
    movie: "All About Eve (1950)",
  },
  { quote: "You talking to me?", movie: "Taxi Driver (1976)" },
  {
    quote: "What we've got here is failure to communicate.",
    movie: "Cool Hand Luke (1967)",
  },
  {
    quote: "I love the smell of napalm in the morning.",
    movie: "Apocalypse Now (1979)",
  },
  {
    quote: "Love means never having to say you're sorry.",
    movie: "Love Story (1970)",
  },
  {
    quote: "The stuff that dreams are made of.",
    movie: "The Maltese Falcon (1941)",
  },
  {
    quote: "They call me Mister Tibbs!",
    movie: "In the Heat of the Night (1967)",
  },
  { quote: "Rosebud.", movie: "Citizen Kane (1941)" },
  { quote: "Made it, Ma! Top of the world!", movie: "White Heat (1949)" },
  {
    quote: "I'm as mad as hell, and I'm not going to take this anymore!",
    movie: "Network (1976)",
  },
  {
    quote: "Louis, I think this is the beginning of a beautiful friendship.",
    movie: "Casablanca (1942)",
  },
  { quote: "There's no place like home.", movie: "The Wizard of Oz (1939)" },
  {
    quote: "I am big! It's the pictures that got small.",
    movie: "Sunset Blvd. (1950)",
  },
  { quote: "Show me the money!", movie: "Jerry Maguire (1996)" },
  {
    quote: "Why don't you come up sometime and see me?",
    movie: "She Done Him Wrong (1933)",
  },
  {
    quote: "I'm walking here! I'm walking here!",
    movie: "Midnight Cowboy (1969)",
  },
  {
    quote: "Play it, Sam.",
    movie: "Casablanca (1942)",
  },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  { quote: "I want to be alone.", movie: "Grand Hotel (1932)" },
  { quote: "Round up the usual suspects.", movie: "Casablanca (1942)" },
  { quote: "You're gonna need a bigger boat.", movie: "Jaws (1975)" },
  {
    quote:
      "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
    movie: "The Treasure of the Sierra Madre (1948)",
  },
  { quote: "I'll be back.", movie: "The Terminator (1984)" },
  {
    quote:
      "Today, I consider myself the luckiest man on the face of the earth.",
    movie: "The Pride of the Yankees (1942)",
  },
  { quote: "If you build it, he will come.", movie: "Field of Dreams (1989)" },
  {
    quote:
      "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
    movie: "Forrest Gump (1994)",
  },
  { quote: "We rob banks.", movie: "Bonnie and Clyde (1967)" },
  { quote: "Plastics.", movie: "The Graduate (1967)" },
  { quote: "We'll always have Paris.", movie: "Casablanca (1942)" },
  { quote: "I see dead people.", movie: "The Sixth Sense (1999)" },
  { quote: "Stella! Hey, Stella!", movie: "A Streetcar Named Desire (1951)" },

  { quote: "Well, nobody's perfect.", movie: "Some Like It Hot (1959)" },
  { quote: "It's alive! It's alive!", movie: "Frankenstein (1931)" },
  { quote: "Houston, we have a problem.", movie: "Apollo 13 (1995)" },
  {
    quote:
      "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry (1971)",
  },
  { quote: "You had me at 'hello.'", movie: "Jerry Maguire (1996)" },
  {
    quote:
      "One morning I shot an elephant in my pajamas. How he got in my pajamas, I don't know.",
    movie: "Animal Crackers (1930)",
  },
  {
    quote: "There's no crying in baseball!",
    movie: "A League of Their Own (1992)",
  },
  { quote: "La-dee-da, la-dee-da.", movie: "Annie Hall (1977)" },
  { quote: "A boy's best friend is his mother.", movie: "Psycho (1960)" },
  {
    quote: "Greed, for lack of a better word, is good.",
    movie: "Wall Street (1987)",
  },
  {
    quote: "Keep your friends close, but your enemies closer.",
    movie: "The Godfather Part II (1974)",
  },
  {
    quote: "Well, here's another nice mess you've gotten me into!",
    movie: "Sons of the Desert (1933)",
  },
  { quote: "Say 'hello' to my little friend!", movie: "Scarface (1983)" },
  { quote: "What a dump.", movie: "Beyond the Forest (1949)" },
  {
    quote: "Gentlemen, you can't fight in here! This is the War Room!",
    movie: "Dr. Strangelove (1964)",
  },
  {
    quote: "Elementary, my dear Watson.",
    movie: "The Adventures of Sherlock Holmes (1939)",
  },
  {
    quote:
      "Of all the gin joints in all the towns in all the world, she walks into mine.",
    movie: "Casablanca (1942)",
  },
  { quote: "Here's Johnny!", movie: "The Shining (1980)" },
  { quote: "Forget it, Jake, it's Chinatown.", movie: "Chinatown (1974)" },
  {
    quote: "I have always depended on the kindness of strangers.",
    movie: "A Streetcar Named Desire (1951)",
  },
  {
    quote: "Hasta la vista, baby.",
    movie: "Terminator 2: Judgment Day (1991)",
  },
  {
    quote: "Open the pod bay doors, HAL.",
    movie: "2001: A Space Odyssey (1968)",
  },
  {
    quote:
      "Striker: Surely you can't be serious. Rumack: I am serious…and don't call me Shirley.",
    movie: "Airplane! (1980)",
  },
  { quote: "Yo, Adrian!", movie: "Rocky (1976)" },
  { quote: "Hello, gorgeous.", movie: "Funny Girl (1968)" },
  {
    quote: "Listen to them. Children of the night. What music they make.",
    movie: "Dracula (1931)",
  },
  {
    quote: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
    movie: "King Kong (1933)",
  },
  { quote: "Attica! Attica!", movie: "Dog Day Afternoon (1975)" },
  {
    quote:
      "Sawyer, you're going out a youngster, but you've got to come back a star!",
    movie: "42nd Street (1933)",
  },
  { quote: "Who's on first.", movie: "The Naughty Nineties (1945)" },
  { quote: "I feel the need — the need for speed!", movie: "Top Gun (1986)" },
  {
    quote: "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
    movie: "Dead Poets Society (1989)",
  },
  { quote: "Snap out of it!", movie: "Moonstruck (1987)" },
  {
    quote:
      "My mother thanks you. My father thanks you. My sister thanks you. And I thank you.",
    movie: "Yankee Doodle Dandy (1942)",
  },
  { quote: "Nobody puts Baby in a corner.", movie: "Dirty Dancing (1987)" },

  { quote: "Carpe diem.", movie: "Dead Poets Society (1989)" },
  { quote: "Why so serious?", movie: "The Dark Knight (2008)" },
  { quote: "To infinity and beyond!", movie: "Toy Story (1995)" },
  { quote: "E.T. phone home.", movie: "E.T. the Extra-Terrestrial (1982)" },
  { quote: "Bond. James Bond.", movie: "Dr. No (1962)" },
  {
    quote: "I am your father.",
    movie: "Star Wars: Episode V - The Empire Strikes Back (1980)",
  },
  { quote: "I'm king of the world!", movie: "Titanic (1997)" },
  { quote: "Just keep swimming.", movie: "Finding Nemo (2003)" },
  { quote: "I see you.", movie: "Avatar (2009)" },
  { quote: "They call it a Royale with cheese.", movie: "Pulp Fiction (1994)" },
  {
    quote: "I'm gonna make him an offer he can't refuse.",
    movie: "The Godfather (1972)",
  },
  {
    quote: "My precious.",
    movie: "The Lord of the Rings: The Two Towers (2002)",
  },

  { quote: "I drink your milkshake!", movie: "There Will Be Blood (2007)" },
  { quote: "Keep the change, ya filthy animal!", movie: "Home Alone (1990)" },
  {
    quote: "I’m not a smart man, but I know what love is.",
    movie: "Forrest Gump (1994)",
  },
  { quote: "I am Groot.", movie: "Guardians of the Galaxy (2014)" },
  {
    quote: "You're a wizard, Harry.",
    movie: "Harry Potter and the Philosopher's Stone (2001)",
  },
  { quote: "I volunteer as tribute.", movie: "The Hunger Games (2012)" },
  { quote: "I am Iron Man.", movie: "Iron Man (2008)" },
  { quote: "That’ll do, pig. That’ll do.", movie: "Babe (1995)" },
  {
    quote: "It's not who I am underneath, but what I do that defines me.",
    movie: "Batman Begins (2005)",
  },
  {
    quote: "I wish I knew how to quit you.",
    movie: "Brokeback Mountain (2005)",
  },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry Met Sally (1989)",
  },
  {
    quote:
      "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.",
    movie: "When Harry Met Sally (1989)",
  },
];
