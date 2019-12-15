const fs = require("fs");
const getQueries = require("./queries/getData.js");
const queryString = require("querystring");
const postData = require("./queries/postData.js");
const path = require("path");
const hash = require("./hash.js");
const cookie = require('cookie');
const { sign, verify } = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
let SECRET = "ssssshhhhh";

const handleHome = response => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};

const handle404 = response => {
  let filePath = path.join(__dirname, "../public/html/not-found.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("A problem has occurred on our end - sorry folks!");
    } else {
      response.writeHead(404, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

// Takes the response from the database and calls getData with a callback that handles err and res
// If no error then stringify the database response and send it back to the front end.
const handleGettingUsers = response => {
  getQueries.getData((err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem getting the users<h1>");
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, { "content-type": "application/json" });
      response.end(output);
    }
  });
};

const serveTrivia = response => {
  let filePath = path.join(__dirname, "../public/html/trivia.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("A problem has occurred on our end - sorry folks!");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

// Takes an array in the form ['name', 'answer1', 'answer2', ... , 'answer7', '']
// Reduces and filters to give a single house name based on the most relevant answers
const sortingHat = answers =>
  answers.reduce(
    (a, b, i, arr) =>
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length
        ? a
        : b,
    null
  );

// On entering a new user and clicking the form submit button
// Streams in data and manipulates it when finished into an array for the sorting hat
// Runs postdata to send relevant name, house_name and points to store in database
// Currently does not change page from index but MAY refresh the page.
const handleCreateNewUser = (url, request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const results = queryString.parse(data);
    let answers = Object.values(results);
    let name = answers[0];
    let password = answers[1][0];
    let house = sortingHat(answers);
    let points = Math.ceil(Math.random() * 100);

    hash.hashPassword(password).then(hashedPassword => {
      postData(name, house, points, hashedPassword, (err, res) => {
        if (err) {
          response.writeHead(500, "Content-Type: text/html");
          response.end(
            "<h1>Sorry, there's been an error at hat HQ, are you a muggle?</h1>"
          );
        } else {
          // DO WE WANT TO REFRESH THE PAGE HERE?
          response.writeHead(301, {
            "Content-type": "text/html",
            Location: "/"
          });
          const filePath = path.join(__dirname, "..", "public/index.html");
          fs.readFile(filePath, (error, file) => {
            if (error) {
              console.log(error);
              return;
            } else {
              response.end(file);
            }
          });

            let userDetails = {
              user: name,
              pass: hashedPassword
            };
            const cookie = sign(userDetails, SECRET);
            response.writeHead(302, {
              Location: "/trivia",
              "Set-Cookie": `jwt=${cookie}; HttpOnly; Max-Age=9000`
            });
            return response.end();
        }
      });
        
    });
  })
}
      



const handleLogin = (request, response) => {
  let allData = "";
  request.on("data", chunk => {
    allData += chunk;
  });
  request.on("end", () => {
    // const { username, password } = qs.parse(allData);
    const loginInfo = queryString.parse(allData);
    let userDetails = { user: `${loginInfo.name}`, pass: `${loginInfo.password}`};
    console.log({userDetails});
    let password = userDetails.pass;
    getQueries.getStoredPassword(userDetails.user, (err, res) => {
      if (err) {console.log("wrong password has been inputted");}
      else {
        let storedPassword = res[0].password;
        console.log({storedPassword})
        console.log({password})
        bcrypt.compare(password, storedPassword, (err, res) => {
          if (err) console.log(err);
          else 
          if (res) { 
            const cookie = sign(userDetails, SECRET);
            console.log({cookie});
              response.writeHead(
                302,
                {
                  'Location': '/trivia',
                  'Set-Cookie': `jwt=${cookie}; HttpOnly; Max-Age=10`
                }
              );
             response.end();
              } else {
                response.writeHead(500, "Content-Type: text/html");
                response.end(
                  "<h1>Wrong password!</h1>"
                );
            }
           
        });
      }
    })
  })
}


const handlePublic = (response, endpoint) => {
  const extension = endpoint.split(".")[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/js",
    ico: "image/x-icon",
    svg: "image/svg+xml",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    gif: "image/gif",
    png: "image/png"
  };
  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      fs.readFile(
        path.join(__dirname, "..", "/public/html/not-found.html"),
        (err2, file2) => {
          if (err2) {
            console.log(err2);
          } else {
            response.writeHead(404, { "content-type": "text/html" });
            response.end(file2);
          }
        }
      );
    } else {
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    }
  });
};
module.exports = {
  handleGettingUsers,
  handleCreateNewUser,
  handleHome,
  handle404,
  handlePublic,
  handleLogin,
  serveTrivia
};
