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

request("/houses", updateDom);

const button = document.querySelector("submit-button");
button.addEventListener("click", () => {
  window.scrollTo(0, document.body.scrollHeight);
});
