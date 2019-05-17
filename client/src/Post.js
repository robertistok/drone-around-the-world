import React from "react";

const remote = window.require("electron").remote;
const shell = remote.shell;
// import electron from "electron";
// const fs = electron.remote.require("fs");
// const ipcRenderer = electron.ipcRenderer;

const Post = ({ mediaPath, captionForFacebook }) => {
  return (
    <section>
      <button onClick={() => shell.showItemInFolder(mediaPath)}>Open in file</button>
      <textarea value={captionForFacebook} rows={6} />
    </section>
  );
};

export default Post;
