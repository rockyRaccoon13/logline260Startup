export class User {
  username;
  password;
  data = {
    joinDate: null,
    firstName: null,
    lastName: null,
    quote: null,
    bioText: null,
  };
  constructor(username, password) {
    this.username = username;
    this.password = password;
    let date = new Date();
    this.data.joinDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }
}
