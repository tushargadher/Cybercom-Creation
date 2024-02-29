let searchButton = document.getElementById("searchButton");
let productInput = document.getElementById("productInput");
let addProductForm = document.getElementById("addProductForm");
let loader = document.querySelector(".loader");
let overlay = document.querySelector(".overlay");
let PriceSort = document.getElementById("PriceSort");
let RatingSort = document.getElementById("RatingSort");
let submitButton = document.getElementById("submitButton");

const PAGESIZE = 10;
let skip = 0;
let limit = 0;
let totalSize = 0;
let currentProducts = [];
document.addEventListener("DOMContentLoaded", getAllProduct);
let LOCALSTORAGE = {
  newProducts: "newProducts",
  deletedProducts: "deletedProductIds",
  updatedProducts: "updatedProducts",
};

const showLoader = () => {
  loader.classList.remove("hide");
  loader.classList.add("show");
};
const hideLoader = () => {
  loader.classList.remove("show");
  loader.classList.add("hide");
};
const showPopUpLoader = () => {
  overlay.classList.remove("hide");
  overlay.classList.add("show");
};
const hidePopUpLoader = () => {
  overlay.classList.remove("show");
  overlay.classList.add("hide");
};
const handlePrevious = () => {
  //initially skip value is falsy
  if (skip) {
    skip = skip - PAGESIZE;
    getAllProduct();
  } else {
    alert("You are on first page");
  }
};
const handleNext = () => {
  if (skip == totalSize - limit) {
    alert("No More Product..!");
  } else {
    skip = skip + PAGESIZE;
    getAllProduct();
  }
};

//sort product
const handlePriceSort = (selected) => {
  //sort() overwrites the original array
  currentProducts.sort((a, b) => {
    if (selected === "ascending") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
  renderProduct(currentProducts);
};
const handleRatingSort = (selected) => {
  //sort() overwrites the original array
  currentProducts.sort((a, b) => {
    if (selected === "ascending") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });
  renderProduct(currentProducts);
};

const bindFormData = (data) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  } = data;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("price").value = price;
  document.getElementById("discountPercentage").value = discountPercentage;
  document.getElementById("rating").value = rating;
  document.getElementById("stock").value = stock;
  document.getElementById("brand").value = brand;
  document.getElementById("category").value = category;
  document.getElementById("thumbnail").value = thumbnail;
};

//render product
const renderProduct = (data) => {
  let container = document.querySelector(".productList");
  container.innerHTML = "";
  const INFODATA = "<h1>Product not found </h1>";
  const deletedProduct =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.deletedProducts)) || [];

  let updatedProducts =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.updatedProducts)) || [];

  data.map((product) => {
    if (deletedProduct.includes(product.id)) return;
    let div = document.createElement("div");
    div.setAttribute("class", "product");

    const updatedProductData =
      updatedProducts.find((item) => item.id === product.id) || product;
    // console.log(updatedProductData);

    let htmlData = `
        <div class="image">
          <img src="${updatedProductData.thumbnail}" alt="product" />
        </div>
        <div class="details">
          <h2>${updatedProductData.title}</h2>
          <p class="description">${updatedProductData.description}</p>
          <p class="price">Price: ${updatedProductData.price}$</p>
          <p class="discount">Discount: ${updatedProductData.discountPercentage}%</p>
          <p class="rating">Rating: ${updatedProductData.rating}</p>
          <p class="stock">Stock: ${updatedProductData.stock}</p>
          <p class="brand">Brand: ${updatedProductData.brand}</p>
          <p class="category">Category: ${updatedProductData.category}</p>
          <button class="productButton" onclick="getSingleProduct(${updatedProductData.id})">Update</button>
          <button class="productButton" onclick="deleteProduct(${updatedProductData.id})">Delete</button>
        </div>
    `;

    div.innerHTML = htmlData;
    container.appendChild(div);
  });
  container.innerHTML = data.length ? container.innerHTML : INFODATA;
};
//add product form
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let dataId = parseInt(submitButton.getAttribute("data-id"));
  let formData = new FormData(e.target);
  formObj = Object.fromEntries(formData);
  if (dataId) {
    updateProduct(dataId, formObj);
  } else {
    addProduct(formObj);
  }
});
searchButton.addEventListener("click", searchProduct);
