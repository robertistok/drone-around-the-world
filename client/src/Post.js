import React from "react";

const remote = window.require("electron").remote;
const shell = remote.shell;
// import electron from "electron";
// const fs = electron.remote.require("fs");
// const ipcRenderer = electron.ipcRenderer;

const Post = () => {
  return (
    <section>
      <button
        onClick={() =>
          shell.showItemInFolder(
            "/Users/robertistok/Documents/Programming/Personal/drone-around-the-world/posts/may_17_b.jpg"
          )
        }
      >
        Open in file
      </button>
    </section>
  );
};

export default Post;
