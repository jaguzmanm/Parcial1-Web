const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let array = [];

function loadData(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
}

loadData((value) => {
  array = value;
  console.log(array);
});

function displayMenu(array, name) {
  let items = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      items = array[i].products;
    }
  }
  let zone = document.getElementById("menuZone");
  for (let i = 0; i < items.length; i++) {
    let card = document.createElement("div");
    card.className = "card";

    let photo = document.createElement("img");
    photo.setAttribute("src", items[i].image);
    photo.setAttribute("alt", "menu Item");

    let body = document.createElement("div");
    body.className = "card-body";

    let nameItem = document.createElement("h4");
    nameItem.className = "card-title";
    nameItem.innerHTML = items[i].name;

    let text = document.createElement("p");
    text.className = "card-text";
    text.innerHTML = items[i].description;

    let price = document.createElement("p");
    price.className = "card-text";
    price.innerHTML = items[i].price;

    let add = document.createElement("button");
    add.className = "btn btn-primary";
    add.innerHTML = "Add to cart";
  }
}

function createTable(array) {
  for (let i = 0; i < array.length; i++) {
    let infoRow = array[i];

    let row = document.createElement("tr");

    let lastName = document.createElement("td");
    let firstName = document.createElement("td");
    let email = document.createElement("td");
    let photoSpace = document.createElement("td");
    let photo = document.createElement("img");

    let nodeLastName = document.createTextNode(infoRow.last_name);
    let nodeFirstName = document.createTextNode(infoRow.first_name);
    let nodeEmail = document.createTextNode(infoRow.email);

    photo.setAttribute("src", infoRow.photo);

    lastName.appendChild(nodeLastName);
    firstName.appendChild(nodeFirstName);
    email.appendChild(nodeEmail);
    photoSpace.appendChild(photo);

    row.appendChild(lastName);
    row.appendChild(firstName);
    row.appendChild(email);
    row.appendChild(photoSpace);

    document.getElementById("info").appendChild(row);
  }
}

document
  .getElementById("last_name")
  .addEventListener("click", sortTableByLastName);

document
  .getElementById("first_name")
  .addEventListener("click", sortTableByFirstName);

document.getElementById("email").addEventListener("click", sortTableByEmail);

function sortTableByLastName() {
  sortTable(0);
}

function sortTableByFirstName() {
  sortTable(1);
}

function sortTableByEmail() {
  sortTable(2);
}

function sortTable(columna) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("mainTable");
  switching = true;
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[columna];
      y = rows[i + 1].getElementsByTagName("TD")[columna];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const addRow = document.forms["newData"];
addRow.addEventListener("submit", function (e) {
  e.preventDefault();
  const lastName = addRow.querySelector("input[id='uno']").value;
  const firstName = addRow.querySelector("input[id='dos']").value;
  const email = addRow.querySelector("input[id='tres']").value;
  const photo = addRow.querySelector("input[id='cuatro']").value;

  const nuevo = [
    {
      last_name: lastName,
      first_name: firstName,
      email: email,
      photo: photo,
    },
  ];
  createTable(nuevo);
});

document.getElementById("mainTable").addEventListener("mouseover", mouseOver);

function mouseOver() {
  rows = document.getElementById("mainTable").rows;
}
