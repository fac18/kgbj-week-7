// requests a response from backend through handleGetUsers
// cb calls updateDom with xhr.responseText as the 'data' argument
const request = (url, cb) => {
    let xhr = new XMLHttpRequest();
     xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb('error' + xhr.responseType);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Parses JSON data and appends it to the DOM as table rows and cells
//in the callback of request, xhr.response (from back end) is passed as 'data' into our DOM function
const updateDom = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    let users = JSON.parse(data);
    let table = document.getElementById("users-table");
    // For each distict item in the database data...
    users.forEach(user => {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      name.textContent = user.name;
      row.appendChild(name);
      let location = document.createElement("td");
      location.textContent = user.house_name;
      row.appendChild(location);
      table.appendChild(row);
      var pointsRow = document.createElement("td");
      pointsRow.textContent = user.points;
      row.appendChild(pointsRow);
      table.appendChild(row);
    });
  }
}

// Call request function with /houses as url (/houses in router runs the getData.js function)
// updateDom is run as the callback argument, taking the data and appending to page.
// request is only called on page refresh? could cause issues down the line.
request('/houses', updateDom);

// This should scroll page on clicking html submit button, but currently the page reloads...something to look at?
// const button = document.querySelector('submit-button');
// button.addEventListener('click', () => {
//   window.scrollTo(0,document.body.scrollHeight);
// })
