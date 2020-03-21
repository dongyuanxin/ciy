const http = require("http");

http
  .createServer((req, res) => {
    res.end("Hello world!");
  })
  .listen(8000, () => {
    console.log("listen port 8000");
  });
