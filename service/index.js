const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require("express");
const app = express();

// app.use(express.static("public"));

app.get("*", (_req, res) => {
  res.send({ msg: "logline service" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
