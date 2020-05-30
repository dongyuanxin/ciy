// import fs from "fs";

const Header = () => {
  return <div>fs</div>;
};

export async function getServerSideProps() {
  try {
    const fs = require("fs");
    console.log("fs is", fs);
  } catch (err) {}
  //   const content = fs.readFileSync("./package.json");
  const content = "123";
  return {
    props: {
      content,
    },
  };
}

export default Header;
