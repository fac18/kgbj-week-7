const dbConnection = require("../database/db_connection.js");

// takes info from form to add to database 
// cb is the rest of the err/res handling - statements are in handleCreateNewUser
const postData = (name, house, points, cb) => {
  dbConnection.query(
    "INSERT INTO users (name, house_name, points) VALUES ($1, $2, $3)",
    [name, house, points],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;
