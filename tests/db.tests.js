const test = require("tape");
const runDbBuild = require("../src/database/db_build.js");
const getData = require("../src/queries/getData.js");
const postData = require("../src/queries/postData.js");

test("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

test("select all data from users table", t => {
  runDbBuild((err, res) => {
    t.error(err, "No error");
    const expected = [
      { id: 1, name: 'Jamie', house_name: 'Slytherin', points: 0},
      { id: 2, name: 'Alex', house_name: 'Hufflepuff', points: 0},
      { id: 3, name: 'Rosa', house_name: 'Hufflepuff', points: 0},
      { id: 4, name: 'Beth', house_name: 'Hufflepuff', points: 0}
    ];
    getData((err, result) => {
      if (err) console.log(err);
      t.deepEqual(result, expected, "returns expected user data");
      t.end();
    });
  });
});
