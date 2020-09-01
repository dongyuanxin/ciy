const express = require("express");
const app = express();
const port = 4444;

app.get("*", (req, res) => {
  console.log("hello");
  res.write(Buffer.from("Hello "));
  // throw new Error();
  res.write(Buffer.from("world!"));
  res.status(200).end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
