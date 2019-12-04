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
        response.end("<h1>Sorry, there's been an error at hat HQ</h1>");
        console.log(err);
      } else {
        response.writeHead(301, {
          "Content-type": "text/html",
          Location: "/houses"
        });
        fs.readFile(__dirname + "/../public/houses.html", function(
          error,
          file
        ) {
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
