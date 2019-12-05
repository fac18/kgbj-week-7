const dbConnection = require('../database/db_connection.js');

const postData = (name, house, cb) => {
  dbConnection.query(
    'INSERT INTO users (name, house,) VALUES ($1, $2)',
    [name, house],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;
