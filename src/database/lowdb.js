const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./src/database/db.json");
const db = low(adapter);

db._.mixin({
  isTrue(array, property, condition) {
    let arrayToFilter = array;

    if (!Array.isArray(arrayToFilter)) {
      arrayToFilter = Object.values(array);
    }

    return arrayToFilter.filter(item => Boolean(item[property]) === condition);
  }
});

module.exports = db;
