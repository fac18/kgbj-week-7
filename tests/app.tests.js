const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  console.log("app-test-file");
  t.end();
});
