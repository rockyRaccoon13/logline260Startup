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
