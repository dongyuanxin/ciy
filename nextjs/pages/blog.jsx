import Header from "./../components/header";
import dynamic from "next/dynamic";

// const DynamicComponent = dynamic(
//   () => import("./../components/header").then((mod) => mod),
//   { ssr: true }
// );

function Blog({ posts }) {
  return (
    <div>
      <Header />
      blog content...
      {/* <DynamicComponent /> */}
    </div>
  );
}

// export async function getStaticProps() {
//   const fs = require("fs");
//   const content = fs.readFileSync("./package.json");
//   return {
//     props: {
//       content: content.toString(),
//     },
//   };
// }

export default Blog;
