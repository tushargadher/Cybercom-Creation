const LOCALSTORAGE = {
  cartData: "cartItems",
};
let cartItems = JSON.parse(localStorage.getItem(LOCALSTORAGE.cartData));
cartItems.length
  ? console.log("Cart is Present")
  : console.log("Cart is emapty");

//we will store the cartitem when user click on checkout button
RenderProduct();
function calculateBill() {
  const totalAmount = productData.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return totalAmount;
}
  
//function to increment quanlity of product
function incrementQuantity(id) {
  let productIndex = productData.findIndex((product) => product.id === id);

  let { quantity } = productData[productIndex];
  productData[productIndex] = {
    ...productData[productIndex],
    quantity: quantity + 1,
  };

  // if (cartItems.some((item) => item.id === id)) {
  //   //change the quantity of product

  //   let itemIndex = cartItems.findIndex((product) => product.id === productIndex);
  //   console.log(productIndex);
  //   cartItems[itemIndex] = {
  //     ...cartItems[itemIndex],
  //     // quantity: quantity + 1,
  //   };
  // } else {
  //   //add product into cart
  //   console.log("product added");
  //   cartItems.push({
  //     ...productData[productIndex],
  //   });
  // }
  // console.log(cartItems);

  RenderProduct();
}

//functiont to descement quanlity of product
function decrementQuantity(id) {
  let productIndex = productData.findIndex((product) => product.id === id);

  let { quantity } = productData[productIndex];
  if (quantity <= 0) {
    alert("Product Quantity can't be negative");
  } else {
    productData[productIndex] = {
      ...productData[productIndex],
      quantity: quantity - 1,
    };

    RenderProduct();
  }
}

//render product page
function RenderProduct() {
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
  // console.log(productData);
  const cartItems = productData.filter((product) => {
    return product.quantity > 0;
  });
  console.log(cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.location.href = "http://127.0.0.1:5501/Cart_Page/index.html";
}
