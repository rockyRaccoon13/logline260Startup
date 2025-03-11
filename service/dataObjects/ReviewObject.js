export class ReviewObject {
  constructor(username, movieTitle, date, text) {
    this.id = Math.floor(Math.random() * 1000000);
    this.likedBy = [];
    this.username = username;

    this.date = date;
    this.movieTitle = movieTitle;
    this.text = text;
  }
}

// Example JSON of ReviewObject
const exampleReview = new ReviewObject(
  "john_doe",
  "Inception",
  "2023-10-05",
  "Great movie!"
);
console.log(JSON.stringify(exampleReview));
