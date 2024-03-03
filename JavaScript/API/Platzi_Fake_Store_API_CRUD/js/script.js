document.addEventListener("DOMContentLoaded", function () {
  getProduct();
  getAllCategory();
});
let loader = document.querySelector(".loader");
let priceValueOp = document.getElementById("priceValue");
let priceRange = document.getElementById("priceRange");
let nextButton = document.getElementById("nextButton");
let previousButton = document.getElementById("previousButton");
let paginationContainer = document.querySelector(".pagination");
let sortBy = "";
previousButton.style.opacity = "0.5";
previousButton.disabled = true;

const redirect = (id) => {
  let confirmed = confirm("You will be redirected to update page?");
  if (confirmed) {
    window.location.href = `http://127.0.0.1:5500/html/addProduct.html?product_id=${id}`;
  }
};
const handleSort = (selectedSortType) => {
  sortBy = selectedSortType;
  getProduct();
};
const renderFilterCategory = (data, containerId) => {
  let select = document.getElementById(`${containerId}`);
  data.map((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.innerHTML = item.name;
    select.insertAdjacentElement("beforeend", option);
  });
};
const renderProduct = (data) => {
  let container = document.querySelector(".productList");
  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<h2>No Product</h2>";
    paginationContainer.style.display = "none";
  } else {
    paginationContainer.style.display = "visible";
  }
  //sorting
  if (sortBy) {
    console.log(sortBy);
    if (sortBy === "AtoZ") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "ZtoA") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  data.map((product) => {
    const cleanedUrl = product.images[0].replace(/[\[\]"]/g, "");
    let div = document.createElement("div");
    div.setAttribute("class", "product-card");
    const HTMLDATA = `
          <div class="product-img">
    
              <img
                src="https://cdn.shopify.com/app-store/listing_images/bae989bf4724d93e23eb869553c6d019/promotional_image/CIzfsvvWuoADEAE=.jpeg?height=720&quality=90&width=1280"
                alt="Product Image"
              />
              </div>
              <div class="product-info">
                <h3>${product.title}</h3>
                <p><strong>Price:</strong> $${product.price}</p>
                <p id="productDescription">
                  <strong>Description:</strong> ${product.description}
                </p>
                <p><strong>Category:</strong> ${product.category.name}</p>
                <div>
                  <button class="btn" id="btn-edit" onClick="redirect(${product.id})">Update</button>
                  <button class="btn" id="btn-delete" onClick="handleDelete(${product.id})">Delete</button>
                </div>
              </div>
          `;
    div.innerHTML = HTMLDATA;
    container.appendChild(div);
  });
};
