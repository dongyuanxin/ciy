const http = require("http");

http
  .createServer((req, res) => {
    res.end("tcb-demo1");
  })
  .listen(80, () => {
    console.log("listen port 80");
  });
