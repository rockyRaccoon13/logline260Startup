const giveMeAJoke = require('give-me-a-joke');

setInterval(() =>{
	giveMeAJoke.getRandomDadJoke((joke) => {
	console.log('**' + joke);
	
});
}, 100)
