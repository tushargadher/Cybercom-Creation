const productData = JSON.parse(localStorage.getItem("productData"));
let tbody = document.getElementsByTagName("tbody")[0];

productData.forEach((element) => {
  let row = document.createElement("tr");
  let tdTitle = document.createElement("td");
  tdTitle.textContent = element.title;
  row.appendChild(tdTitle);

  let tdCategory = document.createElement("td");
  tdCategory.textContent = element.category;
  row.appendChild(tdCategory);

  let tdPrice = document.createElement("td");
  tdPrice.textContent = element.price;
  row.appendChild(tdPrice);

  let tdAction = document.createElement("td");
  //creating edit button
  let editButton = document.createElement("Button");
  editButton.textContent = "Edit";
  tdAction.appendChild(editButton);
  editButton.addEventListener("click", () => {
    editProduct(element);
  });

  //create delete button
  let deleteButton = document.createElement("Button");
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", () => {
    deleteProduct(element);
  });
  tdAction.appendChild(deleteButton);
  row.appendChild(tdAction);
  tbody.insertAdjacentElement("beforeend", row);
});

function editProduct(element) {
  const url = `http://127.0.0.1:5500/addProduct.html?productId=${element.id}`;
  console.log(url);
  window.location.href = url;
}

function deleteProduct(element) {
  const productData = JSON.parse(localStorage.getItem("productData")) || [];
  const newProductList = productData.filter((product) => {
    return element.id != product.id;
  });
  localStorage.setItem("productData", JSON.stringify(newProductList));
  window.location.reload();
}
