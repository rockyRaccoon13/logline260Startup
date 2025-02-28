class EventMessage {
  constructor(from, type, value) {
    this.from = from;
    this.type = type;
    this.value = value;
  }
}

class LikeEventNotifier {
  events = [];
  handlers = [];

  constructor() {
    // Simulate chat messages that will eventually come over WebSocket
    setInterval(() => {
      const randomNum = Math.floor(Math.random() * 3000);
      const userName = randomNames[randomNum % randomNames.length];
      const type = "liked your review of";
      const value = randomMovies[randomNum % randomMovies.length];
      this.broadcastEvent(userName, type, value);
    }, 5000);
  }

  broadcastEvent(from, type, value) {
    // console.log(`Broadcasting event: ${from} ${type} ${value}`);
    const event = new EventMessage(from, type, value);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const randomNames = [
  "Steven_Spielberg",
  "Quentin_Tarantino",
  "Stanley_Kubrick",
  "Alfred_Hitchcock",
  "Christopher_Nolan",
  "Francis_Ford_Coppola",
  "Martin_Scorsese",
  "James_Cameron",
  "David_Fincher",
  "Tim_Burton",
  "Tom_Hanks",
  "Leonardo_DiCaprio",
  "Morgan_Freeman",
  "Robert_De_Niro",
  "Johnny_Depp",
  "Brad_Pitt",
  "Tom_Cruise",
  "Denzel_Washington",
  "Matt_Damon",
  "Will_Smith",
];

const randomMovies = [
  "Jaws",
  "Pulp Fiction",
  "2001: A Space Odyssey",
  "Psycho",
  "Inception",
  "The Godfather",
  "Goodfellas",
  "Avatar",
  "The Social Network",
  "Edward Scissorhands",
  "Forrest Gump",
  "Titanic",
  "Shawshank Redemption",
  "Taxi Driver",
  "Pirates of the Caribbean",
  "Ad Astra",
  "Mission: Impossible - Fallout",
  "Training Day",
  "The Martian",
  "Men in Black",
];

const LikeNotifier = new LikeEventNotifier();
export { LikeNotifier };
