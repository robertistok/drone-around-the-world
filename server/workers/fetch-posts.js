const moment = require("moment");

const downloadMedia = require("../src/lib/downloadMedia");
const { getPostData } = require("../src/lib/scrape");
const { getCaptionForFacebook } = require("../src/lib/post");

const db = require("../src/db");

const expectedMomentFormat = "MMM_DD";
const postIdentifiers = ["a", "b", "c", "d"];

const fetchPosts = async () => {
  const posts = await db.query.posts({ where: { isPublished: false } });

  await Promise.all(
    posts.map(async ({ shortcode, isPostedByCurator = true }, index) => {
      try {
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

        await db.mutation.updatePost({
          where: { shortcode },
          data: { mediaPath: downloadedFilePath, captionForFacebook }
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
};

fetchPosts();
