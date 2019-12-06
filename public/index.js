
function request(url, cb) {
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

  function updateDom(err, data) {
    if (err) {
      console.error(err);
    } else {
      let users = JSON.parse(data);
      console.log(users);
      let table = document.getElementById("users-table");
      /* creates a row in table for each user returned from DB */
      users.forEach(user => {
        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = user.name;
        row.appendChild(name);
        let location = document.createElement("td");
        location.textContent = user.house_name;
        row.appendChild(location);
        table.appendChild(row);
      });
    }
  }

  request('/houses', updateDom);

  const button = document.querySelector('submit-button');
  button.addEventListener('click', () => {
    window.scrollTo(0,document.body.scrollHeight);
  })
