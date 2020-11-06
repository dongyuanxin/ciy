main();

async function main() {
  const app = cloudbase.init({
    env: "hjjhjg-cfd2b6",
  });

  const auth = app.auth({
    persistence: "session",
  });

  const loginState = await auth.signInWithUsernameAndPassword(
    "yuanxin20201105",
    "dyx123456"
  );
  console.log(">>> loginState is", loginState);

  const authHeaders = await auth.getAuthHeaderAsync();
  console.log(">>> authHeaders are", authHeaders);

  const res = await axios({
    method: "get",
    url: "http://localhost:3000/node1",
    headers: {
      ...authHeaders,
    },
  });

  console.log(">>> res is", res);
}
