document.addEventListener("DOMContentLoaded", getProduct);
document.addEventListener("DOMContentLoaded", getAllCategory);
let loader = document.querySelector(".loader");
let priceValueOp = document.getElementById("priceValue");
let priceRange = document.getElementById("priceRange");
let nextButton = document.getElementById("nextButton");
const showLoader = () => {
  loader.classList.remove("hide");
  loader.classList.add("show");
};
const hideLoader = () => {
  loader.classList.remove("show");
  loader.classList.add("hide");
};
const redirect = (id) => {
  let confirmed = confirm("You will be redirected to update page?");
  if (confirmed) {
    window.location.href = `http://127.0.0.1:5500/html/addProduct.html?product_id=${id}`;
  }
};
const handleSort = (selected) => {
  //   console.log(currentProduct);
  //   localeCompare() returns a negative value if a comes before b, a positive value if b comes before a, and zero if they are equal.
  if (selected === "AtoZ") {
    currentProduct.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selected === "ZtoA") {
    currentProduct.sort((a, b) => b.title.localeCompare(a.title));
  }
  //   console.log(currentProduct);
  renderProduct(currentProduct);
};
const renderFilterCategory = (data, containerId) => {
  let select = document.getElementById(`${containerId}`);
  //   select.innerHTML = "";
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
  }

  data.map((product) => {
    // console.log(product.images[0]);
    const cleanedUrl = product.images[0].replace(/[\[\]"]/g, "");
    console.log(cleanedUrl);
    let div = document.createElement("div");
    div.setAttribute("class", "product-card");
    const HTMLDATA = `
          <div class="product-img">
    
              <img
                src=${cleanedUrl}
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
  //   }
};
