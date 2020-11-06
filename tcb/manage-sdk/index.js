const CloudBase = require("@cloudbase/manager-node");
const jsonConf = require("./../fang-wen-mi-yao.json");

const app = CloudBase.init({
  env: "hjjhjg-cfd2b6",
  secretId: jsonConf.id,
  secretKey: jsonConf.key,
});

console.log(jsonConf);

main();

async function main() {
  try {
    const { User } = await app.user.createEndUser({
      username: "yuanxin20201105",
      password: "dyx123456",
    });

    console.log(">>> 新建用户信息：", User);
  } catch (error) {
    console.log(">>> 新建用户失败：", error.message);
  }
}
