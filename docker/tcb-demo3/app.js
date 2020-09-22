const http = require("http");
const express = require("express");

const app = express();

app.use(express.static("public"));

app.listen(80, (err) => {
  if (err) return done(err);
  console.log("listen port 80");
});

app.get("/", (req, res) => {
  res.status(200).send(req.query);
});
