document.addEventListener("DOMContentLoaded", () => {
  const LOCALSTORAGE = {
    productData: "cartItems",
  };

  RenderProduct();
  calculateFair();

  addProductButton.addEventListener("click", () => {
    let conformed = confirm("You Will Be Redirect to Product Page?");
    conformed
      ? (window.location.href = "http://127.0.0.1:5501/Product_Page/")
      : "";
  });

  placeorderButton.addEventListener("click", placeorder);
  function RenderProduct() {
    let productData =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.productData)) || [];
    const table = document.querySelector("table");
    const tbody = document.querySelector("tbody");
    const cartEmptyRow = `<h2>Your Cart Is Empty. Please Add Some Products.</h2>`;
    let isCartEmpty = true;

    productData.forEach((product) => {
      const row = document.createElement("tr");
      if (product.quantity) {
        isCartEmpty = false;
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
          `;
        tbody.appendChild(row);
      }
    });
    table.innerHTML = isCartEmpty ? cartEmptyRow : table.innerHTML;
    let addProductButton = document.getElementById("addProductButton");
    let placeorderButton = document.getElementById("placeorderButton");
    isCartEmpty
      ? (addProductButton.style.display = "visible")
      : (addProductButton.style.display = "none");
    isCartEmpty
      ? (placeorderButton.style.display = "none")
      : (placeorderButton.style.display = "visible");
  }
  function calculateFair() {
    let productData =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.productData)) || [];

    let totalAmount = productData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    let TotalWithGST = totalAmount * 0.18 + totalAmount;
    let str = TotalWithGST.toString(); //convert number to string
    let result = str.substring(0, 7); //first six character
    result = parseFloat(result); // convert it to a number
    let totalDue = document.getElementById("totalDue");
    totalDue ? (totalDue.innerHTML = `<b>$${result}</b>`) : "";
  }

  function placeorder() {
    let conformed = confirm("Place Order ?");
    if (conformed) {
      alert("Your Order is placed");
      localStorage.removeItem(LOCALSTORAGE.productData);
      window.location.href = "http://127.0.0.1:5501/Product_Page/";
    }
  }
});
