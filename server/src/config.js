require("dotenv").config({ path: "variables.env" });

module.exports = {
  PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT
};
