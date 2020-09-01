const express = require("express");
const got = require("got");
const app = express();
const port = 4445;

app.get("/", async (req, res) => {
  const requestConfig = {
    responseType: "buffer",
    retry: 0,
    followRedirect: false,
    methodRewriting: false,
    decompress: false,
    timeout: 20 * 1000,
    throwHttpErrors: false,
    isStream: true,
    agent: undefined,
    method: req.method,
    headers: {
      "x-forwarded-host": req.headers["x-forwarded-host"] || req.hostname,
      "x-forwarded-proto": req.headers["x-forwarded-proto"] || req.protocol,
      ...req.headers,
    },

    // 注意：stream模式下，没有 body 时，要把 body 设置为空字符串，且 GET/HEAD 请求不能有 body
    // 参考 got 文档：
    // `got.stream.post('https://example.com')` will hang indefinitely until a body is provided.
    // If there's no body on purpose, remember to .end() the stream or **set the body option to an empty string**.
    body: undefined,
  };

  const backRes = await got("http://localhost:4444", requestConfig);
  backRes.on("response", () => {
    backRes.pipe(res);
  });

  backRes.on("error", () => {
    console.log(">>> 错误");
    console.log(backRes.read());
    res.end();
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
