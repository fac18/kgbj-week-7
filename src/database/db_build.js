const fs = require('fs');

const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const db_build = cb => dbConnection.query(sql, cb);

module.exports = db_build;
