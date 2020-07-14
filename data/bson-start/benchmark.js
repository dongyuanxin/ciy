var BSON = require("bson");
var EJSON = BSON.EJSON;

var os = require("os");

console.log(" OS: " + os.type() + " " + os.release() + " (" + os.arch() + ")");
console.log(
  "RAM: " +
    os.totalmem() / 1048576 +
    " MB (total), " +
    os.freemem() / 1048576 +
    " MB (free)"
);
console.log("CPU: " + os.cpus()[0].speed + " MHz " + os.cpus()[0].model);

for (var r = 1; r < 4; r++) {
  console.log("\nRun #" + r + ":");
  var obj = {
    abcdef: 1,
    qqq: 13,
    "19": [1, 2, 3, 4],
  };

  var start = Date.now();
  for (var i = 0; i < 500000; i++) {
    JSON.parse(JSON.stringify(obj));
  }
  var stop = Date.now();
  console.log("\t      JSON: " + (stop - start) + " ms");

  start = Date.now();
  for (var i = 0; i < 500000; i++) {
    BSON.deserialize(BSON.serialize(obj));
  }
  stop = Date.now();
  console.log("\t      Bson: " + (stop - start) + " ms");

  var start = Date.now();
  for (var i = 0; i < 500000; i++) {
    EJSON.parse(EJSON.stringify(obj));
  }
  var stop = Date.now();
  console.log("\t      EJSON: " + (stop - start) + " ms");
}
