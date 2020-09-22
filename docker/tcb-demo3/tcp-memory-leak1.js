const net = require("net");
const { once } = require("process");
const heapdump = require("heapdump");
const os = require("os");

function createServer() {
  let net = require("net");
  let tcpServer1 = net.createServer({
    allowHalfOpen: true,
  });

  tcpServer1.on("listening", () => {
    console.log("服务端：开始监听");
  });

  tcpServer1.on("connection", (socket) => {
    console.log("服务端：连接已建立" + "\n");
    tcpServer1.getConnections((err, count) => {
      if (err) {
        console.warn(err);
      } else {
        console.log(`服务端：当前有${count}个连接`);
      }
    });
    socket.on("data", (data) => {
      console.log(data.toString());
    });
    socket.on("error", (err) => {
      console.warn(err);
      socket.destroy();
    });
    socket.on("end", () => {
      console.log("服务端连接：触发end事件");
      socket.end();
    });
  });
  tcpServer1.on("close", () => {
    console.log("closed");
  });
  tcpServer1.listen(9999);
}

createServer();
