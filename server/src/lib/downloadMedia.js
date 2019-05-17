const path = require("path");
const fs = require("fs");
const axios = require("axios");

async function downloadMedia({ url, filename }) {
  const imagePath = path.resolve(__dirname, "../data/posts", filename);

  const file = fs.createWriteStream(imagePath);

  // axios image download with response type "stream"
  const response = await axios({
    method: "GET",
    url,
    responseType: "stream"
  });

  // pipe the result stream into a file on disc
  response.data.pipe(file);

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      console.log(`downloading of ${url} finished.`);
      resolve(imagePath);
    });

    response.data.on("error", () => {
      reject();
    });
  });
}

module.exports = downloadMedia;
