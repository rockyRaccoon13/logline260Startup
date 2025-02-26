export class ReviewObject {
  constructor(movieTitle, date, username, text) {
    this.movieTitle = movieTitle;
    this.username = username;
    this.likes = 0;
    this.text = text;
    this.date = this.changeDateFormat(date);
  }

  changeDateFormat(date) {
    let dateArray = date.split("-");
    return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    // mm/dd/yyyy
  }
}
