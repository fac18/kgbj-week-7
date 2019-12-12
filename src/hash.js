"use strict";

const bcrypt = require('bcryptjs');

// const hashPassword = (password, callback) => {
//   bcrypt.genSalt(12, (err, salt) => {
//     if (err) {
//       callback(err);
//     } else {
//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) {
//           console.log(err)
//           return
//         }
//         return hash
//       });
//     }
//   });
// };

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err);
    } else {
      bcrypt.hash(password, salt, callback);
    }
  });
};

// const hashPassword = (password, cb) => {
//   if (err){
//     cb(err)
//   } else {
//     cb(null, password => {
//       bcrypt.hash(password, 12).then(function(hash) {
//         console.log(hash);
//       });
//     })
//   }
// }

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

module.exports = {
  comparePasswords,
  hashPassword
};
