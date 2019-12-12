const {
  handleGettingUsers,
  handleCreateNewUser,
  handleHome,
  handle404,
  handlePublic
} = require("./handlers");

const getData = require("./queries/getData.js");

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handleHome(response);
  } else if (endpoint === "/trivia") {
    handleGettingUsers(response, (null, data));
  } else if (endpoint === "/create-user") {
    handleCreateNewUser(endpoint, request, response);
  } else if (endpoint.startsWith("/public")) {
    handlePublic(response, endpoint);
  } else {
    handle404(response);
  }
};

module.exports = router;
