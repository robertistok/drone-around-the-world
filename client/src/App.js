import React from "react";

import Post from "./Post";

import db from "./data/db.json";

function App() {
  // const posts = lowdb
  //   .get("posts")
  //   .isTrue("shortcode", true)
  //   .value();

  // console.log(posts);

  return (
    <div className="App">
      {Object.values(db.posts)
        .filter(post => post.mediaPath)
        .map(post => (
          <Post key={post.shortcode} {...post} />
        ))}
    </div>
  );
}

export default App;
