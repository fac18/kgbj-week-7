const fs = require("fs");
const getData = require("./queries/getData.js");
const queryString = require("querystring");
const postData = require("./queries/postData.js");
const path = require("path");

const handleHome = response => {
  const filepath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filepath, (err, file) => {
    if (err) return serverError(err, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(file);
  });
};

const handle404 = response => {
  let filePath = path.join(__dirname, "../public/not-found.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      response.writeHead(500, { "content-type": "text/html" });
      response.end("A problem has occurred on our end - sorry folks!");
    } else {
      response.writeHead(404, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

const handleGettingUsers = response => {
  getData((err, res) => {
    if (err) {
      response.writeHead(500, "Content-Type:text/html");
      response.end("<h1>Sorry, there was a problem getting the users<h1>");
      console.log(err);
    } else {
      let output = JSON.stringify(res);
      response.writeHead(200, { "content-type": "application/json" });
      response.end(output);
    }
  });
};

const handleCreateNewUser = (url, request, response) => {
  let data = "";
  request.on("data", chunk => {
    data += chunk;
  });
  request.on("end", () => {
    const name = queryString.parse(data).name;
    const house = queryString.parse(data).house;
    postData(name, house, (err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type: text/html");
        response.end(
          "<h1>Sorry, there's been an error at hat HQ, are you a muggle?</h1>"
        );
        console.log(err);
      } else {
        response.writeHead(301, {
          "Content-type": "text/html",
          Location: "/houses"
        });
        fs.readFile(__dirname + "./../public/houses.html", (error, file) => {
          if (error) {
            console.log(error);
            return;
          } else {
            response.end(file);
          }
        });
      }
    });
  });
};

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
      console.log(error);
      fs.readFile(
        path.join(__dirname, "..", "/public/not-found.html"),
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
  handlePublic
};
