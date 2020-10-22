const tcb = require("@cloudbase/node-sdk");

diaoYongScf();

async function diaoYongScf() {
  const app = tcb.init({
    env: "hjjhjg-cfd2b6",
    secretId: "",
    secretKey: "",
  });

  const scfRes = await app.callFunction({
    name: "node1",
    data: {},
  });
  console.log(">>> scfRes is", scfRes);
}
