const dbConnection = require("../database/db_connection.js");

const getData = cb => {
  console.log({cb});
  dbConnection.query("SELECT * FROM users", (err, res) => {
    if (err) {return cb(err)}
    else {
    cb(null, res.rows)
  }
  });
};

module.exports = getData;
