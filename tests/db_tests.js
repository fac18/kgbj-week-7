const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getData");
const postData = require("../src/queries/postData");


tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});

tape('select all data from users table', (t) => {
	    runDbBuild((err, res) => {
	        t.error(err, 'No error');
	        let expected = [ { id: 1, name: 'Jamie', house_name: 'Slytherin'),
          (id: 2, name: 'Alex', house_name: 'Hufflepuff'),
          (id: 3, name: 'Rosa', house_name: 'Hufflepuff'),
          (id: 4, name: 'Rosa', house_name: 'Hufflepuff')];
	        queries.getUsers((err, result) => {
	            if (err) console.log(err);
	            t.deepEqual(result, expected, 'returns expected user data');
	            t.end();
	        })
	    })
	});
