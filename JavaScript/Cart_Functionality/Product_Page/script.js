let productData = JSON.parse(localStorage.getItem("productData")) || [];
if (!productData.length) {
  let productData = [
    {
      id: 1,
      name: "Strandmond",
      price: 295.63,
      quantity: 0,
      image: "../asset/images/sofa.jpg",
    },
    {
      id: 2,
      name: "Mellby",
      price: 749.62,
      quantity: 0,
      image: "../asset/images/mellby.jpg",
    },
    {
      id: 3,
      name: "Micke",
      price: 144.21,
      quantity: 0,
      image: "../asset/images/micke.jpg",
    },
    {
      id: 4,
      name: "Sheesham Queen Size Bed",
      price: 437.54,
      quantity: 0,
      image: "../asset/images/bad.jpg",
    },
  ];
  localStorage.setItem("productData", JSON.stringify(productData));
}
RenderProduct();
function calculateBill() {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  const totalAmount = productData.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return totalAmount;
}

//function to increment quanlity of product
function incrementQuantity(id) {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  let productIndex = productData.findIndex((product) => product.id === id);
  console.log(productData[productIndex]);
  productData[productIndex] = {
    ...productData[productIndex],
    quantity: productData[productIndex].quantity + 1,
  };
  console.log(productData[productIndex]);
  localStorage.setItem("productData", JSON.stringify(productData));
  RenderProduct();
}

//functiont to descement quanlity of product
function decrementQuantity(id) {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  let productIndex = productData.findIndex((product) => product.id === id);
  if (productData[productIndex].quantity <= 0) {
    alert("Product Quantity can't be negative");
  } else {
    productData[productIndex] = {
      ...productData[productIndex],
      quantity: productData[productIndex].quantity - 1,
    };
    console.log(productData[productIndex]);
    localStorage.setItem("productData", JSON.stringify(productData));
    RenderProduct();
  }
}

//render product page
function RenderProduct() {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  const productContainer = document.querySelector(".productContainer");
  productContainer.innerHTML = "";
  productData.forEach((item) => {
    let productDiv = document.createElement("div");
    productDiv.setAttribute("class", "product");
    productDiv.innerHTML = `
          <div class="product-details">
             <img src=${item.image} alt=${item.name} srcset="" />
             <div class="price">
                <span>${item.name}</span>
                <span>$${item.price}</span>
             </div>
          </div>
          <div class="buttonGroup">
              <button onClick="decrementQuantity(${item.id})"> - </button>
              <span>${item.quantity}</span>
              <button onClick="incrementQuantity(${item.id})"> + </button>
          </div>`;
    productContainer.appendChild(productDiv);
  });
  document.getElementById("totalAmount").innerHTML = `$${calculateBill()}`;
}

//function checkout
function handleCheckOut() {
  window.location.href = "http://127.0.0.1:5501/Cart_Page/index.html";
}
