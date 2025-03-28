const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("logline");
const userCollection = db.collection("user");
const profileCollection = db.collection("profile");
const reviewCollection = db.collection("review");
const quoteCollection = db.collection("movieQuote");
const regex_iExact = (variable) => {
  return new RegExp("^" + variable + "$", "i");
};

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

async function addUser(user) {
  await userCollection.insertOne(user);
}

function getUser(username) {
  const usernameRegex = regex_iExact(username);

  return userCollection.findOne({
    username: { $regex: usernameRegex },
  });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function updateUser(user) {
  return userCollection.updateOne({ username: user.username }, { $set: user });
}

function getRandomQuote() {
  let randCursor = quoteCollection.aggregate([{ $sample: { size: 1 } }]);
  let rand = randCursor.next();

  return rand;
}

async function addQuotes(quotes) {
  await quoteCollection.insertMany(quotes);
}

async function addProfile(profile) {
  await profileCollection.insertOne(profile);
}

async function updateProfile(profile) {
  profileCollection.updateOne(
    { username: profile.username },
    { $set: profile }
  );
}

function getProfileByUsername(username) {
  const usernameRegex = regex_iExact(username);
  return profileCollection.findOne({
    username: { $regex: usernameRegex },
  });
}

async function addReview(review) {
  await reviewCollection.insertOne(review);
}

function getUserReviews(username) {
  const query = { username: username };
  const options = {
    sort: { _id: -1 },
  };
  const cursor = reviewCollection.find(query, options);
  return cursor.toArray();
}

function getReviews() {
  const cursor = reviewCollection.find().sort({ _id: -1 });
  return cursor.toArray();
}

function getReviewById(reviewId) {
  return reviewCollection.findOne({ id: reviewId });
}

async function updateReview(review) {
  console.log("db updating review");
  console.log(review);
  reviewCollection.updateOne({ id: review.id }, { $set: review });
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addQuotes,
  getRandomQuote,
  getProfileByUsername,
  addProfile,
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  updateProfile,
  getUserReviews,
};
