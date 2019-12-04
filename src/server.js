const http = require("http");
const router = require("./router.js");

const server = http.createServer(router);
const port = process.env.PORT || 1234;

server.listen(port, () => {
  console.log(`Muggle-magic happens on port ${port}`);
});
