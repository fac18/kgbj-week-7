"use strict";

const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
    }
  });
};

// const hashPassword = (password, callback) => {
//   bcrypt.genSalt(12, (err, salt) => {
//     if (err) {
//       callback(err);
//     } else {
//       console.log(salt);
//     bcrypt.hash(password, salt, (err, res) => {
//     if (err) {
//       callback(err)
//     } else {
//       console.log(res);
//     callback(null, res)
//     }
//   });
//   }
// });
// }

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

module.exports = {
  comparePasswords,
  hashPassword
};
