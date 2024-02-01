let loggedUser = JSON.parse(localStorage.getItem("AdminInfo"));

if (loggedUser.isAdmin) {
  $("#loginUserName").html(`Hello ,${loggedUser.name}`);
}else{
    // console.log();
}
