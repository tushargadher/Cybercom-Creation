
$(document).ready(function () {


  $("#RegisterNowButton").click(function () {
    window.location.href = "http://127.0.0.1:5500/HTML/Registration.html";
  });
  let loggedUser = JSON.parse(localStorage.getItem("AdminInfo"));
  console.log(loggedUser);
  if (loggedUser.isAdmin) {
    $("#RegisterNowButton").hide();
    $("#or").hide();
  }

  $("#loginForm").submit(function (e) {
    e.preventDefault();
    // const formValid = formValidation(email, password);

    let email = $("#email").val();
    let password = $("#password").val();
    if (loggedUser.email == email && loggedUser.password == password) {
      // alert("Login SuccessFully..");
      window.location.href = "http://127.0.0.1:5500/HTML/Dashboard.html";
    } else {
      alert("Please Check Your Login Details");
    }
  });
});

function formValidation(email, password) {
  let valid = true;
  if (email === "") {
    document.getElementById("email_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("email_error").innerText = "";
  }
  if (password === "") {
    document.getElementById("password_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("password_error").innerText = "";
  }
}
