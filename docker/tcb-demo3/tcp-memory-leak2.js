const net = require("net");
const { once } = require("process");
const heapdump = require("heapdump");
const os = require("os");

function createClient(timeout) {
  const socket = new net.Socket();
  socket.setNoDelay();
  const onError = () => {
    // socket.removeAllListeners();
    socket.destroy();
    resolve(false);
  };

  return new Promise((resolve) => {
    socket
      .setTimeout(timeout)
      .once("error", () => {
        socket.destroy();
        resolve(false);
      })
      .once("timeout", () => {
        socket.destroy();
        resolve(false);
      })
      //   .once("close", () => {
      //     console.log("客户端：触发close事件");
      //     resolve(false);
      //   })
      .connect(9999, "127.0.0.1", () => {
        // console.log("客户端：连接成功");
        socket.end();
        resolve(true);
      });
  });
}

function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
}

function getMemUsage() {
  return 1 - os.freemem() / os.totalmem();
}

async function main() {
  //   heapdump.writeSnapshot("./" + Date.now() + ".heapsnapshot");
  const logs = [];
  logs.push(process.memoryUsage());

  for (let j = 0; j < 50000; ++j) {
    await createClient(500);
    console.log(process.memoryUsage().rss);
  }
  console.log(">>> helo");
  gc();
  logs.push(process.memoryUsage());
  //   [ [ 5693440, 2690376 ], [ 12820480, 2671064 ] ] // end
  // [ [ 5693440, 2691784 ], [ 8364032, 2578656 ] ]  // des

  // [ [ 5693440, 2700688 ], [ 13344768, 5038736 ] ]
  // [ [ 5693440, 2743808 ], [ 8364032, 4452504 ] ]
  //
  //   heapdump.writeSnapshot("./" + Date.now() + ".heapsnapshot");
  console.log(logs);
}

main();
