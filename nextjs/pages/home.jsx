import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  console.log(router);
  useEffect(() => {
    router.push("/home?counter=10", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter]);

  return (
    <div>
      <div>Home Page!</div>
      <Link href="/posts/[id]" as="/posts/1">
        <a>跳转到动态路由</a>
      </Link>
      <Link href="/blog">
        <a>next/router的Link标签：Blog</a>
      </Link>
      <br />
      <a href="/blog" target="_self">
        普通a标签：Blog
      </a>
      <button onClick={() => Router.push("/blog")}>
        next/router编程式跳转：Blog
      </button>
    </div>
  );
};

export default HomePage;

// export async function getStaticPaths() {
//   console.log(">>> run getStaticPaths");
//   return {};
// }

export async function getStaticProps(props) {
  console.log(">>> run getStaticProps");
  return {
    props,
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
