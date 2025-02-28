export class ReviewObject {
  constructor(username, movieTitle, date, text) {
    this.id = Math.floor(Math.random() * 1000000);
    this.movieTitle = movieTitle;
    this.username = username;
    this.likedBy = [];
    this.text = text;
    this.date = this.changeDateFormat(date);
  }

  changeDateFormat(date) {
    let dateArray = date.split("-");
    return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    // mm/dd/yyyy
  }
}
