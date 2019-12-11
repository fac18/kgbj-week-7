// requests a response from backend through handleGetUsers
// cb calls updateDom with xhr.responseText as the 'data' argument
const request = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, JSON.parse(xhr.responseText));
    } else {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

const updateDom = (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const users = JSON.parse(data[0]);
    const table = document.getElementById("users-table");
    /* creates a row in table for each user returned from DB */
    users.forEach(user => {
      const row = document.createElement("tr");
      const name = document.createElement("td");
      name.textContent = user.name;
      row.appendChild(name);
      const location = document.createElement("td");
      location.textContent = user.house_name;
      row.appendChild(location);
      table.appendChild(row);

      const pointsRow = document.createElement("td");
      pointsRow.textContent = user.points;
      row.appendChild(pointsRow);
      table.appendChild(row);

      /* create a table in the frontend and in the backend for each house returned from DB */
      const houses = JSON.parse(data[1]);
    });
  }
};

// Call request function with /houses as url (/houses in router runs the getData.js function)
// updateDom is run as the callback argument, taking the data and appending to page.
// request is only called on page refresh? could cause issues down the line.
request("/houses", updateDom);

// This should scroll page on clicking html submit button, but currently the page reloads...something to look at?
// const button = document.querySelector('submit-button');
// button.addEventListener('click', () => {
//   window.scrollTo(0,document.body.scrollHeight);
// })
