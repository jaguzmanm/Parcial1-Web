const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let array = [];
let itemsInCart = [];
let uniquesItems = [];

function loadData(callback) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(res);
    });
}

loadData((value) => {
  array = value;
});

let burgerElem = document.getElementById("Burguers");
let tacoElem = document.getElementById("Tacos");
let saladElem = document.getElementById("Salads");
let dessertElem = document.getElementById("Desserts");
let drinkElem = document.getElementById("Drinks");

let elemMenu = [burgerElem, tacoElem, saladElem, dessertElem, drinkElem];

elemMenu.forEach((item) => {
  item.addEventListener("click", () => {
    displayMenu(array, item.id);
  });
});

document.getElementById("cart").addEventListener("click", showOrderDetail);

function confirmOrder() {
  let finalOrder = [];
  for (let i = 0; i < uniquesItems.length; i++) {
    let product = {};
    product.item = i + 1;
    product.quantity = uniquesItems[i].quantity;
    product.description = uniquesItems[i].name;
    product.unitPrice = uniquesItems[i].price;
    finalOrder.push(product);
  }
  console.log("Orden: ", finalOrder);
}

function cancelOrder() {
  uniquesItems = [];
  itemsInCart = [];
  showOrderDetail();
  let numItems = document.getElementById("numItems").lastElementChild;
  numItems.innerHTML = "";
}

function displayMenu(array, name) {
  if (name === "Drinks") {
    name = "Drinks and Sides";
  }

  document.getElementById("titleMenu").lastElementChild.innerHTML = name;
  let items = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      items = array[i].products;
    }
  }
  let zone = document.getElementById("menuZone");

  let child = zone.lastElementChild;
  while (child) {
    zone.removeChild(child);
    child = zone.lastElementChild;
  }
  let cont = 0;
  let rowOf4 = document.createElement("div");
  rowOf4.className = "row";
  for (let i = 0; i < items.length; i++) {
    let cardZone = document.createElement("div");
    cardZone.className = "col-lg-3";

    let cardZone2 = document.createElement("div");
    cardZone2.className = "col-lg-12 cardZone";

    let card = document.createElement("div");
    card.className = "card";

    let photo = document.createElement("img");
    photo.setAttribute("src", items[i].image);
    photo.setAttribute("alt", "menu Item");
    photo.className = "itemPhoto";

    let body = document.createElement("div");
    body.className = "card-body";

    let strongName = document.createElement("strong");
    let nameNode = document.createTextNode(items[i].name);

    let nameItem = document.createElement("h4");
    nameItem.className = "card-title";
    strongName.appendChild(nameNode);
    nameItem.appendChild(strongName);

    let text = document.createElement("p");
    text.className = "card-text";
    text.innerHTML = items[i].description;

    let strongPrice = document.createElement("strong");
    let priceNode = document.createTextNode("$" + items[i].price);

    let price = document.createElement("p");
    price.className = "card-text";
    strongPrice.appendChild(priceNode);
    price.appendChild(strongPrice);

    let strongAdd = document.createElement("strong");
    let addNode = document.createTextNode("Add to cart");

    let add = document.createElement("button");
    add.className = "btn btn-primary btnItem";
    add.id = "btnAdd " + name + " " + i;

    strongAdd.appendChild(addNode);
    add.appendChild(strongAdd);

    body.appendChild(nameItem);
    body.appendChild(text);
    body.appendChild(price);
    body.appendChild(add);

    card.appendChild(photo);
    card.appendChild(body);

    cardZone2.appendChild(card);
    cardZone.appendChild(cardZone2);

    if (cont < 4) {
      rowOf4.appendChild(cardZone);
      cont++;
    } else {
      zone.appendChild(rowOf4);
      rowOf4 = document.createElement("div");
      rowOf4.className = "row";
      cont = 0;
    }
  }
  zone.appendChild(rowOf4);
  prepareButtons();
}

function prepareButtons() {
  let buts = document.getElementsByClassName("btnItem");
  let arrayBut = [].slice.call(buts);
  arrayBut.forEach((item) => {
    item.addEventListener("click", () => {
      addToCart(item.id);
    });
  });
}

function addToCart(idBtn) {
  let numItems = document.getElementById("numItems").lastElementChild;
  if (itemsInCart.length === 0) {
    numItems.innerHTML = "1 item";
  } else {
    let newNum = itemsInCart.length + 1;
    numItems.innerHTML = newNum + " items";
  }
  let values = idBtn.split(" ");
  let name = values[1];
  if (name === "Drinks") {
    name = "Drinks and Sides";
  }
  let added = false;
  for (let i = 0; i < array.length && !added; i++) {
    if (array[i].name === name) {
      if (name === "Drinks and Sides") {
        itemsInCart.push(array[i].products[parseInt(values[4])]);
      } else {
        itemsInCart.push(array[i].products[parseInt(values[2])]);
      }
    }
  }
}

function showOrderDetail() {
  document.getElementById("titleMenu").lastElementChild.innerHTML =
    "ORDER DETAIL";

  let zone = document.getElementById("menuZone");
  let child = zone.lastElementChild;
  while (child) {
    zone.removeChild(child);
    child = zone.lastElementChild;
  }

  let table = document.createElement("table");
  table.className = "table table-striped";

  let head = document.createElement("thead");
  let row = document.createElement("tr");

  let strItemNum = document.createElement("th");
  strItemNum.scope = "col";
  strItemNum.appendChild(document.createTextNode("Item"));

  let strQuan = document.createElement("th");
  strQuan.scope = "col";
  strQuan.appendChild(document.createTextNode("Qty."));

  let strDescrip = document.createElement("th");
  strDescrip.scope = "col";
  strDescrip.appendChild(document.createTextNode("Description"));

  let strPrice = document.createElement("th");
  strPrice.scope = "col";
  strPrice.appendChild(document.createTextNode("Unit price"));

  let strAmount = document.createElement("th");
  strAmount.scope = "col";
  strAmount.appendChild(document.createTextNode("Amount"));

  let strModify = document.createElement("th");
  strModify.scope = "col";
  strModify.appendChild(document.createTextNode("Modify"));

  row.appendChild(strItemNum);
  row.appendChild(strQuan);
  row.appendChild(strDescrip);
  row.appendChild(strPrice);
  row.appendChild(strAmount);
  row.appendChild(strModify);

  head.appendChild(row);

  table.appendChild(head);

  uniquesItems = filterUnique(itemsInCart);

  let body = document.createElement("tbody");
  for (let i = 0; i < uniquesItems.length; i++) {
    let infoRow = uniquesItems[i];

    let row = document.createElement("tr");

    let strItemNum = document.createElement("td");
    strItemNum.appendChild(document.createTextNode(i + 1));

    let strQuan = document.createElement("td");
    strQuan.id = "quantity " + i;
    strQuan.appendChild(document.createTextNode(infoRow.quantity));

    let strDescrip = document.createElement("td");
    strDescrip.appendChild(document.createTextNode(infoRow.name));

    let strPrice = document.createElement("td");
    strPrice.appendChild(document.createTextNode(infoRow.price));

    let strAmount = document.createElement("td");
    strAmount.id = "amount " + i;
    strAmount.appendChild(
      document.createTextNode(infoRow.price * infoRow.quantity),
    );

    let butModify = document.createElement("td");

    let butSpace = document.createElement("div");
    butSpace.className = "row";

    let plusSpace = document.createElement("div");
    plusSpace.className = "col-lg-3";
    let butPlus = document.createElement("button");
    butPlus.className = "btn btn-primary btnModify";
    butPlus.id = "btnPlus " + i;
    butPlus.appendChild(document.createTextNode("+"));
    plusSpace.appendChild(butPlus);

    let minusSpace = document.createElement("div");
    minusSpace.className = "col-lg-2";
    let butMinus = document.createElement("button");
    butMinus.className = "btn btn-primary btnModify";
    butMinus.id = "btnMinus " + i;
    butMinus.appendChild(document.createTextNode("-"));
    minusSpace.appendChild(butMinus);

    butSpace.appendChild(plusSpace);
    butSpace.appendChild(minusSpace);

    butModify.appendChild(butSpace);

    row.appendChild(strItemNum);
    row.appendChild(strQuan);
    row.appendChild(strDescrip);
    row.appendChild(strPrice);
    row.appendChild(strAmount);
    row.appendChild(butModify);

    body.appendChild(row);
  }
  table.appendChild(body);
  zone.appendChild(table);

  let sumary = document.createElement("div");
  sumary.className = "row";

  let totalSpace = document.createElement("div");
  totalSpace.className = "col-lg-9";

  let strongtotal = document.createElement("strong");
  let totalNode = document.createTextNode("Total: $" + calculateTotalPrice());

  let txtTotal = document.createElement("p");
  txtTotal.id = "totalAmount";
  txtTotal.appendChild(totalNode);
  strongtotal.appendChild(txtTotal);
  totalSpace.appendChild(strongtotal);

  let finishOrderSpace = document.createElement("div");
  finishOrderSpace.className = "col-lg-3";

  let finishSpace = document.createElement("div");
  finishSpace.className = "row";

  let cancelSpace = document.createElement("div");
  cancelSpace.className = "col-lg-4";

  let confirmSpace = document.createElement("div");
  confirmSpace.className = "col-lg-8";

  let butCancel = document.createElement("button");
  butCancel.className = "btn btn-primary";
  butCancel.id = "btnCancel";
  butCancel.appendChild(document.createTextNode("Cancel"));
  cancelSpace.appendChild(butCancel);

  let butConfirm = document.createElement("button");
  butConfirm.className = "btn btn-primary";
  butConfirm.id = "btnConfirm";
  butConfirm.appendChild(document.createTextNode("Confirm order"));
  confirmSpace.appendChild(butConfirm);

  finishSpace.appendChild(cancelSpace);
  finishSpace.appendChild(confirmSpace);

  finishOrderSpace.appendChild(finishSpace);

  sumary.appendChild(totalSpace);
  sumary.appendChild(finishOrderSpace);

  zone.appendChild(sumary);

  prepareButtonsModify();

  document.getElementById("btnConfirm").addEventListener("click", confirmOrder);
  document.getElementById("btnCancel").addEventListener("click", cancelOrder);
}

function prepareButtonsModify() {
  let buts = document.getElementsByClassName("btnModify");
  let arrayBut = [].slice.call(buts);
  arrayBut.forEach((item) => {
    item.addEventListener("click", () => {
      modifyOrder(item.id);
    });
  });
}

function modifyOrder(idBtn) {
  let values = idBtn.split(" ");
  let item = uniquesItems[parseInt(values[1])];
  if (values[0] === "btnPlus") {
    item.quantity++;
  } else {
    item.quantity--;
  }
  document.getElementById("quantity " + values[1]).innerHTML = item.quantity;
  document.getElementById("amount " + values[1]).innerHTML =
    item.quantity * item.price;

  document.getElementById("totalAmount").innerHTML =
    "Total: $" + calculateTotalPrice();

  let numItems = document.getElementById("numItems").lastElementChild;
  numItems.innerHTML = calculateTotalItems() + " items";
}

function filterUnique(data) {
  let uniques = [];
  let times = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (uniques.indexOf(item) !== -1) {
      times[uniques.indexOf(item)]++;
    } else {
      uniques.push(item);
      times[uniques.indexOf(item)] = 1;
    }
  }
  for (let i = 0; i < uniques.length; i++) {
    uniques[i].quantity = times[i];
  }
  return uniques;
}

function calculateTotalPrice() {
  let total = 0;
  for (let i = 0; i < uniquesItems.length; i++) {
    total = total + uniquesItems[i].price * uniquesItems[i].quantity;
  }
  return total;
}

function calculateTotalItems() {
  let total = 0;
  for (let i = 0; i < uniquesItems.length; i++) {
    total = total + uniquesItems[i].quantity;
  }
  return total;
}
