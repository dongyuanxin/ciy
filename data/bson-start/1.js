const BSON = require("bson");
const Long = BSON.Long;
const EJSON = BSON.EJSON;

// Serialize a document
const doc = { long: Long.fromNumber(100), name: "dongyuanxin", arr: [1, 2] };
const data = BSON.serialize(doc);
console.log("data:", data);

// Deserialize the resulting Buffer
const doc_2 = BSON.deserialize(data);
console.log("doc_2:", doc_2);

console.log(
  EJSON.serialize({
    date: new Date(),
    hello: Long.fromNumber(100),
    test: new BSON.Double(
      1000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    ),
    int32: new BSON.Int32(123),
    arr: [1, 2],
    maxKey: new BSON.MaxKey(),
    objId: new BSON.ObjectId(`123456789011`),
    hello2: Long.fromNumber(
      1000000000000000000000000000000000000000000000000000000000000000000000000000000000000
    ),
  })
);
