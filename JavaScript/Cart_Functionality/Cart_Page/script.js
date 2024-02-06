// alert("Cart Page");
document.addEventListener("DOMContentLoaded", () => {
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
  RenderProduct();
  calculateFair();
  let addProductButton = document.getElementById("addProductButton");
  let placeorderButton = document.getElementById("placeorderButton");

  addProductButton.addEventListener("click", () => {
    let conformed = confirm("You Will Be Redirect to Product Page?");
    conformed
      ? (window.location.href = "http://127.0.0.1:5501/Product_Page/")
      : "";
  });

  placeorderButton.addEventListener("click", placeorder);
  function RenderProduct() {
    let productData = JSON.parse(localStorage.getItem("productData")) || [];
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
  }
  function calculateFair() {
    let productData = JSON.parse(localStorage.getItem("productData")) || [];

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
      localStorage.setItem("productData", JSON.stringify(productData));
      window.location.href = "http://127.0.0.1:5501/Product_Page/";
    }
  }
});
