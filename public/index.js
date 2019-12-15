// requests a response from backend through handleGetUsers
// cb calls updateDom with xhr.responseText as the 'data' argument
const request = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

// Make an object to store current housepoints totals per house per database request
let housepoints = {
  g: 0,
  h: 0,
  r: 0,
  s: 0
};

// Logout button

const logoutButton = document.getElementById("logoutButton");

const logout = () => {
  document.cookie = "jwt=; expires=01/01/1970; path=/;";
  window.location.pathname="/";
}

logoutButton.addEventListener("click", logout);

// Parses JSON data and appends it to the DOM as table rows and cells
//in the callback of request, xhr.response (from back end) is passed as 'data' into our DOM function
const updateDom = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let users = JSON.parse(data);

    // Grab the four tables
    let gryffindor = document.getElementById("g-table");
    let hufflepuff = document.getElementById("h-table");
    let ravenclaw = document.getElementById("r-table");
    let slytherin = document.getElementById("s-table");

    const addRows = (users, house) => {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      name.textContent = users.name;
      row.appendChild(name);
      let pointsRow = document.createElement("td");
      pointsRow.textContent = users.points;
      row.appendChild(pointsRow);
      house.appendChild(row);
    };

    // For each distict item in the database data...
    users.forEach(user => {
      switch (user.house_id) {
        case 1: {
          addRows(user, gryffindor);
          housepoints.g += user.points;
          let gPoints = document.getElementById("g-points");
          gPoints.textContent = `total house points: ${housepoints.g}`;
          break;
        }
        case 2: {
          addRows(user, hufflepuff);
          housepoints.h += user.points;
          let hPoints = document.getElementById("h-points");
          hPoints.textContent = `total house points: ${housepoints.h}`;
          break;
        }
        case 3: {
          addRows(user, ravenclaw);
          housepoints.r += user.points;
          let rPoints = document.getElementById("r-points");
          rPoints.textContent = `total house points: ${housepoints.r}`;
          break;
        }
        case 4: {
          addRows(user, slytherin);
          housepoints.s += user.points;
          let sPoints = document.getElementById("s-points");
          sPoints.textContent = `total house points: ${housepoints.s}`;
        }
      }
    });
  }
};

// Call request function with /houses as url (/houses in router runs the getData.js function)
// updateDom is run as the callback argument, taking the data and appending to page.
// request is only called on page refresh? could cause issues down the line.
// const loginButton = document.querySelector('#loginButton')
// loginButton.addEventListener('click',
request("/houses", updateDom);

// This should scroll page on clicking html submit button, but currently the page reloads...something to look at?
// const button = document.querySelector('submit-button');
// button.addEventListener('click', () => {
//   window.scrollTo(0,document.body.scrollHeight);
// })
