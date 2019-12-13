const dbConnection = require("../database/db_connection.js");


// Ask database for particular data and runs the callback if no error
// The callback statements are actually in handleGettingUsers and is what sends the data away to front end
const getData = cb => {
  dbConnection.query("SELECT name, house_id, points FROM users ORDER BY points DESC", (err, res) => {
    if (err) {return cb(err)}
    else {
    cb(null, res.rows)
  }
  });
};

module.exports = getData;
