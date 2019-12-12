// // "use strict";

// // const bcrypt = require('bcryptjs');

// // const hashPassword = (password, callback) => {
// //   bcrypt.genSalt(12, (err, salt) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //      bcrypt.hash(password, salt, (err, hash) => {
// //         if (err) {
// //           console.log(err)
// //           return
// //         }
// //         console.log(callback(null, hash));
// //         return callback(null, hash);
// //       });
// //     }
// //   });
// // };

//     // hash.hashPassword("poo", (err, output) => {
//     //   if (err)  
//     //   {console.log(err);
//     //   }
//     //   else {
//     //   password = output;
//     //   }
//     // });

//     // console.log({password});



// // const hashPassword = (password, cb) => {
// //   bcrypt.genSalt(10, (err, salt) => {
// //     if (err) {
// //       cb(err);
// //     } else {
// //       cb(null, bcrypt.hash(password, salt, callback));
// //     }
// //   });
// // };

// // const hashPassword = (password, cb) => {
// //   if (err){
// //     cb(err)
// //   } else {
// //     cb(null, password => {
// //       bcrypt.hash(password, 12).then(function(hash) {
// //         console.log(hash);
// //       });
// //     })
// //   }
// // }

// const comparePasswords = (password, hashedPassword, callback) => {
//   bcrypt.compare(password, hashedPassword, callback);
// };

// module.exports = {
//   comparePasswords,
//   hashPassword
// };
