const axios = require("axios");

const POST_BASE_URL = "https://www.instagram.com/p";

const getJSONFromHTML = html => {
  const jsonObject = html
    .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
    .slice(0, -1);

  return JSON.parse(jsonObject);
};

const getPostData = async ({ shortcode }) => {
  const { data: postHtml } = await axios({
    method: "get",
    url: `${POST_BASE_URL}/${shortcode}`
  });

  const postObjectFromHtml = getJSONFromHTML(postHtml);
  const post = postObjectFromHtml.entry_data.PostPage[0].graphql.shortcode_media;
  const postCaption = post.edge_media_to_caption.edges[0].node.text;

  return {
    imageUrl: post.display_url,
    location: (post.location && post.location.name) || "Unknown",
    caption: postCaption,
    username: post.owner.username
  };
};

module.exports = { getPostData };
