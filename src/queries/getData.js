const dbConnection = require("../database/db_connection.js");

const getData = cb => {
  dbConnection.query("SELECT * FROM users ORDER BY house_name", (err, res) => {
    if (err) {return cb(err)}
    else {
    cb(null, res.rows)
  }
  });
};

module.exports = getData;
