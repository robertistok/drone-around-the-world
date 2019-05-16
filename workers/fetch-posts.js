const moment = require("moment");

const downloadMedia = require("../src/downloadMedia");
const { getPostData } = require("../src/scrape");
const { getCaptionForFacebook } = require("../src/post");
const lowdb = require("../src/database/lowdb");

const expectedMomentFormat = "MMM_DD";
const postIdentifiers = ["a", "b", "c", "d"];

const fetchPosts = async () => {
  const posts = lowdb
    .get("posts")
    .isTrue("published", false)
    .value();

  await Promise.all(
    Object.values(posts).map(async ({ shortcode, isPostedByCurator = true }, index) => {
      const datePartOfTheFilename = moment()
        .add(Math.floor(index / 4), "days")
        .format(expectedMomentFormat);
      const filename = `${datePartOfTheFilename}_${postIdentifiers[index % 4]}.jpg`.toLowerCase();

      const post = await getPostData({ shortcode });
      const downloadedFilePath = await downloadMedia({ url: post.imageUrl, filename });
      const captionForFacebook = getCaptionForFacebook({
        ...post,
        isPostedByCurator
      });
      const postId = `posts.[${shortcode}]`;

      lowdb
        .set(`${postId}.mediaPath`, downloadedFilePath)
        .set(`${postId}.captionForFacebook`, captionForFacebook)
        .write();
    })
  );
};

fetchPosts();
