const { getRandomQuote, addQuotes } = require("../service/database");
const fs = require("fs");

async function main() {
  const data = fs.readFileSync("MovieQuotesData.json", "utf-8");
  const randomQuotes = JSON.parse(data);
  await addQuotes(randomQuotes);

  let rand = await getRandomQuote();

  console.log(rand);
}

main();
