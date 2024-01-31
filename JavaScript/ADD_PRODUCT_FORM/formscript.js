let productForm = document.getElementById("productForm");
// let showButton = document.getElementById("showProductButton");
let inputTitle = document.getElementById("productTitle");
let inputPrice = document.getElementById("productPrice");
let inputDescription = document.getElementById("productDescription");
let selectCategory = document.getElementById("productCategory");

let queryParams = new URLSearchParams(window.location.search);
let editProduct_id = queryParams.get("productId");
function redirectUser() {
  window.location.href = "http://127.0.0.1:5500/showProduct.html";
}
if (editProduct_id) {
  document.getElementsByTagName("h1")[0].innerText = "Edit Product Form";
  document.title = "Edit Product Form";

  const productData = JSON.parse(localStorage.getItem("productData")) || [];
  const editProduct = productData.filter((product) => {
    return product.id == editProduct_id;
  });
  const { title, price, description, category } = editProduct[0];
  inputTitle.value = title;
  inputPrice.value = price;
  inputDescription.value = description;
  selectCategory.value = category;
}

productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let productTitle = inputTitle.value;
  let productPrice = inputPrice.value;
  let productDescription = inputDescription.value;
  let productCategory = selectCategory.value;
  const formValid = formValidation(
    productTitle,
    productPrice,
    productDescription,
    productCategory
  );
  const productData = JSON.parse(localStorage.getItem("productData")) || [];
  if (editProduct_id && formValid) {
    let product = {
      id: editProduct_id,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
    };
    const filterProduct = productData.filter((product) => {
      return product.id != editProduct_id;
    });
    console.log(filterProduct);
    const updatedProducts = [...filterProduct, product];
    localStorage.setItem("productData", JSON.stringify(updatedProducts));
    productForm.reset();
    alert("Product Details Updated");
  } else if (formValid) {
    let product_id = Date.now();
    let product = {
      id: product_id,
      title: productTitle,
      price: productPrice,
      description: productDescription,
      category: productCategory,
    };
    productData.push(product);
    localStorage.setItem("productData", JSON.stringify(productData));
    productForm.reset();
    alert("Product Added");
  }
});

function formValidation(title, price, description, category) {
  let valid = true;

  if (title === "") {
    document.getElementById("title_error").innerText =
      "Please Enter Product Title";
    valid = false;
  } else {
    document.getElementById("title_error").innerText = "";
  }

  if (price === "" || isNaN(price) || price <= 0) {
    document.getElementById("price_error").innerText =
      "Please Enter valid Product price";
    valid = false;
  } else {
    document.getElementById("price_error").innerText = "";
  }

  if (description === "") {
    document.getElementById("description_error").innerText =
      "Please Enter Product Description";
    valid = false;
  } else {
    document.getElementById("description_error").innerText = "";
  }

  if (category === "") {
    document.getElementById("category_error").innerText =
      "Please select category";
    valid = false;
  } else {
    document.getElementById("category_error").innerText = "";
  }
  return valid;
}
