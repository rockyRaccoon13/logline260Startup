export class User {
  username;
  password;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

export class Profile {
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
