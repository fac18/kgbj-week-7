
function request(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(null, xhr.responseText);
      } else {
        cb('error' + xhr.responseType);
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  function updateTable(err, data) {
    if (err) {
      console.error(err);
    } else {
      var users = JSON.parse(data);
      var table = document.getElementById('users-table');
      /* create a row in table for each user returned from DB */
      users.forEach(function(user) {
        var row = document.createElement('tr');
        var name = document.createElement('td');
        name.textContent = user.name;
        row.appendChild(name);
        var house = document.createElement('td');
        house.textContent = user.location;
        row.appendChild(location);
        table.appendChild(row);
      });
    }
  }
  
  request('/users', updateTable);
