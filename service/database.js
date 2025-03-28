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
    console.log(`Connect to database`);
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
  return userCollection.findOne({ username: username });
}

function getUserByUsername(username) {
  const usernameRegex = regex_iExact(username);

  return userCollection.findOne({
    username: { $regex: usernameRegex },
  });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

function updateUser(user, value) {
  return userCollection.updateOne(
    { username: user.username },
    { $set: { value } }
  );
}

async function getRandomQuote() {
  let randCursor = quoteCollection.aggregate([{ $sample: { size: 1 } }]);
  let rand = await randCursor.next();

  return rand;
}

async function addQuotes(quotes) {
  await quoteCollection.insertMany(quotes);
}

// function addProfile(profile) {

// }
// function updateProfile(profile) {}
// function getProfileByUsername(username) {
//   const usernameRegex = regex_iExact(username);
//   return profileCollection.findOne({
//     username: { $regex: usernameRegex },
//   });
// }

// function addReview(review) {}
// function updateReview(review) {}

async function main() {}

main();

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addQuotes,
  getRandomQuote,
};
