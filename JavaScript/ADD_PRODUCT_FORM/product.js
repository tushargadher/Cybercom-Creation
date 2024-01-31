displayProducts();
function displayProducts() {
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  const productData = JSON.parse(localStorage.getItem("productData")) || [];

  if (!productData.length) {
    alert("Product List is Emapty");
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = "No Product To display";

    row.appendChild(td);
    tbody.appendChild(row);
    return;
  }
  productData.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.title}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>
        <button onClick="editProduct(${product.id});">Edit</button>
        <button onClick="deleteProduct(${product.id});">Remove</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
function editProduct(productID) {
  const url = `http://127.0.0.1:5500/addProduct.html?productId=${productID}`;
  window.location.href = url;
}

function deleteProduct(productID) {
  let conform = confirm("Delete Product?");
  if (conform) {
    const productData = JSON.parse(localStorage.getItem("productData")) || [];
    const newProductList = productData.filter((product) => {
      return productID != product.id;
    });
    localStorage.setItem("productData", JSON.stringify(newProductList));
    displayProducts();
  }
}
