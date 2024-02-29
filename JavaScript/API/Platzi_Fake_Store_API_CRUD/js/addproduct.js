document.addEventListener("DOMContentLoaded", getProduct);
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("product_id");
let addProductForm = document.getElementById("addProductForm");
let submitButton = document.getElementById("submitBtn");

if (productId) {
  //get the value of product which is going to update
  getSignalProduct(productId);
  submitButton.innerText = "Update Product";
}
getAllCategory();
const renderCategory = (data, containerId) => {
  console.log(containerId);
  let select = document.getElementById(`${containerId}`);
  data.map((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.name;
    select.insertAdjacentElement("beforeend", option);
  });
};

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let categoryId = document.getElementById("categoryId").value;
  let images = document.getElementById("images").value;
  if (!title || !price || !description || !categoryId || !images) {
    alert("Please Enter All Field");
  }
  let formObj = {
    title: title,
    price: price,
    description: description,
    categoryId: categoryId,
    images: images.split(",").map((url) => url.trim()),
  };
  if (productId) {
    handleUpdate(formObj, productId);
  } else {
    addProduct(formObj);
  }
});
