// alert("Cart Page");
let productData = JSON.parse(localStorage.getItem("productData")) || [];
productData.forEach((product) => {
  let tbody = document.getElementsByTagName("tbody")[0];
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>$${product.price}</td>
    `;
  tbody.appendChild(row);
});



let total = 0;
productData.map((product) => {
  productPrice = Number.parseFloat(product.price) * product.quantity;
  console.log(total);
  total = productPrice + total;
});

let TotalWithGST = total * 0.18 + total;

var str = TotalWithGST.toString(); //convert number to string
var result = str.substring(0, 7); // cut six first character
result = parseFloat(result); // convert it to a number
document.getElementById("totalDue").innerHTML = `<b>$${result}</b>`;
console.log(total);


// productData.reducer