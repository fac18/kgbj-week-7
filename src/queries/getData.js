const dbConnection = require("../database/db_connection.js");

const getUsers = cb => {
  dbConnection.query("SELECT * FROM users ORDER BY house_name", (err, res) => {
    if (err) {
      return cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getHouses = cb => {
  dbConnection.query(
    "SELECT house_name, attributes FROM house ORDER BY house_name",
    (err, res) => {
      if (err) {
        return cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

module.exports = {
  getUsers,
  getHouses
};
