import React, { useEffect } from "react";
import fs from "fs";
import path from "path";

const fsPromise = fs.promises;

const fileDirPath = path.join(process.cwd(), "files");

const FilenamePage = ({ filename, content }) => {
  return (
    <>
      <h2>文件名：{filename}</h2>
      <p>文件内容：{content}</p>
    </>
  );
};

export default FilenamePage;

export async function getStaticPaths() {
  const filenames = await fsPromise.readdir(fileDirPath);

  return {
    paths: filenames.map((filename) => {
      const ext = path.extname(filename);
      return {
        params: {
          filename: path.basename(filename, ext),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filenames = await fsPromise.readdir(fileDirPath);
  let content = "";
  let _filename = "";
  for (const filename of filenames) {
    if (filename.startsWith(params.filename)) {
      _filename = filename;
      content = await fsPromise.readFile(path.join(fileDirPath, filename));
      break;
    }
  }

  return {
    props: {
      filename: _filename,
      content: content.toString("utf8"),
    },
  };
}
