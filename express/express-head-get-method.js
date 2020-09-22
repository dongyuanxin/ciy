const express = require("express");
const got = require("got");
const app = express();
const port = 3000;

app.get("*", (req, res) => {
  console.log("method is get");
  res.end("method is get");
});

app.head("*", (req, res) => {
  console.log("method is head");
  res.send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
