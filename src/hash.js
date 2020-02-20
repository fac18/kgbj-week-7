"use strict";

const bcrypt = require("bcryptjs");

const generateSalt = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(new Error(err));
        return;
      } else {
        const passSalt = [password, salt];
        resolve(passSalt);
      }
    });
  });
};

const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashedPassword, callback);
};

const hashIt = (password, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(new Error(err));
        return;
      } else {
        resolve(hash);
      }
    });
  });
};

const hashPassword = password => {
  return new Promise((resolve, reject) => {
    generateSalt(password)
      .then(passSalt => hashIt(passSalt[0], passSalt[1]))
      .then(hashedPassword => resolve(hashedPassword))
      .catch(console.error);
  });
};


module.exports = {
  hashPassword, comparePasswords
};
