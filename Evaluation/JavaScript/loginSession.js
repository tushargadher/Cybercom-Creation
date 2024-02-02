let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser.isAdmin) {
  $("#loginUserName").html(`Hello ,${loggedUser.name}`);
} else {
  // console.log();
}
