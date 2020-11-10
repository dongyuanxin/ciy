module.exports = (app) => {
  app.cache = new Map();

  app.once("server", (server) => {
    console.log(">>> lalala");
  });
  app.on("error", (err, ctx) => {
    // report error
  });
  app.on("request", (ctx) => {
    // log receive request
  });
  app.on("response", (ctx) => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    // log total cost
  });
};
