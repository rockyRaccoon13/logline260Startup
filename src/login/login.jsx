import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthState } from "./authState";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";

import "./login.css";

export function Login({ username, authState, onAuthChange }) {
  const [apiQuote, setApiQuote] = React.useState("random quote");
  const [apiMovie, setApiMovie] = React.useState("random author");

  const [apiPoster, setApiPoster] = React.useState("/filmStrip.jpg");

  function getMoviePoster(movieTitle) {
    const baseUrl = "https://imdb.iamidiotareyoutoo.com";
    const uri = encodeURI(`${baseUrl}/search?q=${movieTitle}`);
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        if (data.description && data.description.length > 0) {
          setApiPoster(data.description[0]["#IMG_POSTER"]);
        }
      });
  }

  function fetchMovieQuote() {
    fetch("/api/quote")
      .then((response) => response.json())
      .then((data) => {
        setApiQuote(data.quote);
        setApiMovie(data.movie);
        getMoviePoster(data.movie);
      });
  }

  React.useEffect(() => {
    fetchMovieQuote();
  }, []);

  return (
    <main className="container-fluid text-center">
      <h1>Welcome to Logline</h1>
      {authState === AuthState.Authenticated && (
        <>
          <img alt={`${apiMovie} poster`} src={apiPoster} width="300" />

          <MovieQuoteDisplay quote={apiQuote} movie={apiMovie} />
          <Authenticated
            username={username}
            onLogout={() => onAuthChange(username, AuthState.Unauthenticated)}
          />
        </>
      )}

      {authState === AuthState.Unauthenticated && (
        <>
          <img alt="filmStrip" src="/filmStrip.jpg" width="300" />
          <MovieQuoteDisplay quote={apiQuote} movie={apiMovie} />

          <div id="welcome">
            <p className="description-text">
              Logline is a web app that allows users to log, share, and read
              short 1-2 line film reviews.
            </p>
          </div>

          <Unauthenticated
            username={username}
            onLogin={(loginUsername) => {
              onAuthChange(loginUsername, AuthState.Authenticated);
            }}
          />
        </>
      )}
    </main>
  );
}

function MovieQuoteDisplay({ quote, movie }) {
  return (
    <p id="api-quote-text">
      <span className="movie-quote-text">"{quote}"</span>
      <span> - </span>
      <span className="movie-quote-movie"> {movie}</span>
    </p>
  );
}

var randomQuotes = [
  {
    quote: "Frankly, my dear, I don’t give a damn.",
    movie: "Gone with the Wind (1939)",
  },
  {
    quote: "I'm going to make him an offer he can't refuse.",
    movie: "The Godfather (1972)",
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
  { quote: "E.T. phone home.", movie: "E.T. the Extra-Terrestrial (1982)" },
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
  {
    quote:
      "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.",
    movie: "The Silence of the Lambs (1991)",
  },
  { quote: "Bond. James Bond.", movie: "Dr. No (1962)" },
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
    quote: "Play it, Sam. Play 'As Time Goes By.'",
    movie: "Casablanca (1942)",
  },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  { quote: "I want to be alone.", movie: "Grand Hotel (1932)" },
  {
    quote: "After all, tomorrow is another day!",
    movie: "Gone with the Wind (1939)",
  },
  { quote: "Round up the usual suspects.", movie: "Casablanca (1942)" },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry Met Sally (1989)",
  },
  {
    quote:
      "You know how to whistle, don't you, Steve? You just put your lips together and blow.",
    movie: "To Have and Have Not (1944)",
  },
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
  {
    quote: "Oh, Jerry, don't let's ask for the moon. We have the stars.",
    movie: "Now, Voyager (1942)",
  },
  { quote: "Shane. Shane. Come back!", movie: "Shane (1953)" },
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
    quote: "As God is my witness, I'll never be hungry again.",
    movie: "Gone with the Wind (1939)",
  },
  {
    quote: "Well, here's another nice mess you've gotten me into!",
    movie: "Sons of the Desert (1933)",
  },
  { quote: "Say 'hello' to my little friend!", movie: "Scarface (1983)" },
  { quote: "What a dump.", movie: "Beyond the Forest (1949)" },
  {
    quote: "Mrs. Robinson, you're trying to seduce me. Aren't you?",
    movie: "The Graduate (1967)",
  },
  {
    quote: "Gentlemen, you can't fight in here! This is the War Room!",
    movie: "Dr. Strangelove (1964)",
  },
  {
    quote: "Elementary, my dear Watson.",
    movie: "The Adventures of Sherlock Holmes (1939)",
  },
  {
    quote: "Take your stinking paws off me, you damned dirty ape.",
    movie: "Planet of the Apes (1968)",
  },
  {
    quote:
      "Of all the gin joints in all the towns in all the world, she walks into mine.",
    movie: "Casablanca (1942)",
  },
  { quote: "Here's Johnny!", movie: "The Shining (1980)" },
  { quote: "They're here!", movie: "Poltergeist (1982)" },
  { quote: "Is it safe?", movie: "Marathon Man (1976)" },
  {
    quote: "Wait a minute, wait a minute. You ain't heard nothin' yet!",
    movie: "The Jazz Singer (1927)",
  },
  { quote: "No wire hangers, ever!", movie: "Mommie Dearest (1981)" },
  {
    quote: "Mother of mercy, is this the end of Rico?",
    movie: "Little Caesar (1930)",
  },
  { quote: "Forget it, Jake, it's Chinatown.", movie: "Chinatown (1974)" },
  {
    quote: "I have always depended on the kindness of strangers.",
    movie: "A Streetcar Named Desire (1951)",
  },
  {
    quote: "Hasta la vista, baby.",
    movie: "Terminator 2: Judgment Day (1991)",
  },
  { quote: "Soylent Green is people!", movie: "Soylent Green (1973)" },
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
  { quote: "Toga! Toga!", movie: "National Lampoon's Animal House (1978)" },
  {
    quote: "Listen to them. Children of the night. What music they make.",
    movie: "Dracula (1931)",
  },
  {
    quote: "Oh, no, it wasn't the airplanes. It was Beauty killed the Beast.",
    movie: "King Kong (1933)",
  },
  {
    quote: "My precious.",
    movie: "The Lord of the Rings: The Two Towers (2002)",
  },
  { quote: "Attica! Attica!", movie: "Dog Day Afternoon (1975)" },
  {
    quote:
      "Sawyer, you're going out a youngster, but you've got to come back a star!",
    movie: "42nd Street (1933)",
  },
  {
    quote:
      "Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, go, go!",
    movie: "On Golden Pond (1981)",
  },
  {
    quote:
      "Tell 'em to go out there with all they got and win just one for the Gipper.",
    movie: "Knute Rockne All American (1940)",
  },
  { quote: "A martini. Shaken, not stirred.", movie: "Goldfinger (1964)" },
  { quote: "Who's on first.", movie: "The Naughty Nineties (1945)" },
  {
    quote:
      "Cinderella story. Outta nowhere. A former greenskeeper, now, about to become the Masters champion. It looks like a mirac…It's in the hole! It's in the hole! It's in the hole!",
    movie: "Caddyshack (1980)",
  },
  {
    quote: "Life is a banquet, and most poor suckers are starving to death!",
    movie: "Auntie Mame (1958)",
  },
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
  {
    quote: "I'll get you, my pretty, and your little dog, too!",
    movie: "The Wizard of Oz (1939)",
  },
  { quote: "I'm king of the world!", movie: "Titanic (1997)" },

  { quote: "You're gonna need a bigger boat.", movie: "Jaws (1975)" },
  { quote: "I'll be back.", movie: "The Terminator (1984)" },
  { quote: "May the Force be with you.", movie: "Star Wars (1977)" },
  { quote: "Here's looking at you, kid.", movie: "Casablanca (1942)" },
  { quote: "There's no place like home.", movie: "The Wizard of Oz (1939)" },
  { quote: "Carpe diem.", movie: "Dead Poets Society (1989)" },
  { quote: "My precious.", movie: "The Lord of the Rings (2002)" },
  { quote: "I see dead people.", movie: "The Sixth Sense (1999)" },
  { quote: "Why so serious?", movie: "The Dark Knight (2008)" },
  { quote: "To infinity and beyond!", movie: "Toy Story (1995)" },
  { quote: "Houston, we have a problem.", movie: "Apollo 13 (1995)" },
  { quote: "E.T. phone home.", movie: "E.T. the Extra-Terrestrial (1982)" },
  { quote: "Bond. James Bond.", movie: "Dr. No (1962)" },
  {
    quote: "I am your father.",
    movie: "Star Wars: Episode V - The Empire Strikes Back (1980)",
  },
  { quote: "Life is like a box of chocolates.", movie: "Forrest Gump (1994)" },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry Met Sally (1989)",
  },
  { quote: "Here's Johnny!", movie: "The Shining (1980)" },
  {
    quote: "Hasta la vista, baby.",
    movie: "Terminator 2: Judgment Day (1991)",
  },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  { quote: "I feel the need - the need for speed.", movie: "Top Gun (1986)" },
  {
    quote: "Keep your friends close, but your enemies closer.",
    movie: "The Godfather Part II (1974)",
  },
  { quote: "I'm king of the world!", movie: "Titanic (1997)" },
  { quote: "Just keep swimming.", movie: "Finding Nemo (2003)" },
  {
    quote: "My mama always said life was like a box of chocolates.",
    movie: "Forrest Gump (1994)",
  },
  { quote: "Say hello to my little friend!", movie: "Scarface (1983)" },
  { quote: "I see you.", movie: "Avatar (2009)" },
  { quote: "You had me at 'hello'.", movie: "Jerry Maguire (1996)" },
  { quote: "They call it a Royale with cheese.", movie: "Pulp Fiction (1994)" },
  { quote: "I'm the king of the world!", movie: "Titanic (1997)" },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  { quote: "I see dead people.", movie: "The Sixth Sense (1999)" },
  { quote: "You had me at 'hello'.", movie: "Jerry Maguire (1996)" },
  { quote: "I feel the need — the need for speed!", movie: "Top Gun (1986)" },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  {
    quote: "I'm gonna make him an offer he can't refuse.",
    movie: "The Godfather (1972)",
  },
  {
    quote: "Hasta la vista, baby.",
    movie: "Terminator 2: Judgment Day (1991)",
  },
  { quote: "Why so serious?", movie: "The Dark Knight (2008)" },
  { quote: "There's no place like home.", movie: "The Wizard of Oz (1939)" },
  {
    quote: "My precious.",
    movie: "The Lord of the Rings: The Two Towers (2002)",
  },
  { quote: "To infinity and beyond!", movie: "Toy Story (1995)" },
  { quote: "Just keep swimming.", movie: "Finding Nemo (2003)" },
  {
    quote: "This is the start of a beautiful friendship.",
    movie: "Casablanca (1942)",
  },
  { quote: "Life is like a box of chocolates.", movie: "Forrest Gump (1994)" },
  {
    quote: "I am your father.",
    movie: "Star Wars: Episode V - The Empire Strikes Back (1980)",
  },
  {
    quote: "The force will be with you. Always.",
    movie: "Star Wars: Episode IV - A New Hope (1977)",
  },
  { quote: "I drink your milkshake!", movie: "There Will Be Blood (2007)" },
  { quote: "Keep the change, ya filthy animal!", movie: "Home Alone (1990)" },
  { quote: "You're gonna need a bigger boat.", movie: "Jaws (1975)" },
  { quote: "You had me at 'hello'.", movie: "Jerry Maguire (1996)" },
  {
    quote: "I’m not a smart man, but I know what love is.",
    movie: "Forrest Gump (1994)",
  },
  { quote: "To infinity and beyond!", movie: "Toy Story (1995)" },
  { quote: "Why so serious?", movie: "The Dark Knight (2008)" },
  { quote: "I am Groot.", movie: "Guardians of the Galaxy (2014)" },
  {
    quote: "You're a wizard, Harry.",
    movie: "Harry Potter and the Philosopher's Stone (2001)",
  },
  {
    quote: "The night is dark and full of terrors.",
    movie: "Game of Thrones (2011)",
  },
  { quote: "I am Iron Man.", movie: "Iron Man (2008)" },
  { quote: "There's no place like home.", movie: "The Wizard of Oz (1939)" },
  { quote: "I feel the need — the need for speed!", movie: "Top Gun (1986)" },
  { quote: "I’ll be back.", movie: "The Terminator (1984)" },
  { quote: "Just one more thing.", movie: "The Pink Panther (2006)" },
  { quote: "That’ll do, pig. That’ll do.", movie: "Babe (1995)" },
  {
    quote: "It's not who I am underneath, but what I do that defines me.",
    movie: "Batman Begins (2005)",
  },
  { quote: "I drink your milkshake!", movie: "There Will Be Blood (2007)" },
  { quote: "We are Groot.", movie: "Guardians of the Galaxy (2014)" },
  {
    quote: "I'm gonna make him an offer he can't refuse.",
    movie: "The Godfather (1972)",
  },
  { quote: "You can't handle the truth!", movie: "A Few Good Men (1992)" },
  { quote: "You had me at 'hello.'", movie: "Jerry Maguire (1996)" },
  {
    quote: "I wish I knew how to quit you.",
    movie: "Brokeback Mountain (2005)",
  },
  {
    quote: "I'll have what she's having.",
    movie: "When Harry Met Sally (1989)",
  },
  { quote: "Nobody puts Baby in a corner.", movie: "Dirty Dancing (1987)" },
];
