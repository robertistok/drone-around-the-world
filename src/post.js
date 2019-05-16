const POST_BASE_URL = "https://www.instagram.com";

const getCreatorInstagramProfile = ({ caption, isPostedByCurator, username }) => {
  let originalCreator = username;

  if (isPostedByCurator) {
    let usernameFromCaption;
    const indexOfAtSign = caption.indexOf("@");

    if (indexOfAtSign === -1) {
      usernameFromCaption = undefined;
    } else {
      usernameFromCaption = caption
        .substr(indexOfAtSign)
        .split(" ")[0]
        .replace("@", "");
    }

    originalCreator = usernameFromCaption || username;
  }

  const creatorProfile = `${POST_BASE_URL}/${originalCreator}`;

  return creatorProfile;
};

const getCaptionForFacebook = ({ location, caption, isPostedByCurator, username }) => {
  const creatorProfile = getCreatorInstagramProfile({ caption, isPostedByCurator, username });
  const captionForFacebook = `${location}\n\nCredits to ${creatorProfile}`;

  return captionForFacebook;
};

module.exports = { getCaptionForFacebook };
