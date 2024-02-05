let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
if (loggedUser) {
  $("#loginUserName").html(`Hello ,${loggedUser.name}`);
} else {
  alert("Please Login to access portal");
  window.location.href = "http://127.0.0.1:5500/HTML/login.html";
}
$("#logoutButton").click(function () {
  let confirmed = confirm("Are you sure to logout?");
  if (confirmed) {
    sessionStorage.removeItem("loggedUser");
    let usersData = JSON.parse(localStorage.getItem("usersData"));
    let indexOfuser = usersData.findIndex((user) => user.id === loggedUser.id);
    console.log(usersData[indexOfuser]);
    usersData[indexOfuser] = {
      ...usersData[indexOfuser],
      logoutTime: new Date().toLocaleString(),
    };
    console.log(usersData[indexOfuser]);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    $("#logoutButton").attr("href", "http://127.0.0.1:5500/HTML/login.html");
  }
});

RenderUser();
function RenderUser() {
  let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
  console.log(usersData);
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  usersData.forEach((user) => {
    if (!user.isAdmin && user.loginTime && user.logoutTime) {
      let row = document.createElement("tr");
      row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.loginTime}</td>
      <td>${user.logoutTime}</td>
      `;
      tbody.appendChild(row);
    }
  });
}
