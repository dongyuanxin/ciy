// import fs from "fs";
import path from "path";
import fs from "fs";

import { useRouter } from "next/router";

const PostPage = (props) => {
  const router = useRouter();
  console.log("router is", router);
  return (
    <div>
      <div>post is {props.params.id}</div>
      <div>name is {props.name}</div>
    </div>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "create" } },
  ];
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(props) {
  console.log("props are", props);
  // 这个地方必须要用,fs才不会报错
  const name = fs.close.toString();
  return {
    props: {
      ...props,
      name,
    },
  };
}

// export async function getServerSideProps(props) {
//   console.log("props are", props);
//   return {
//     props: {
//       params: {
//         id: 1,
//       },
//     },
//   };
// }
