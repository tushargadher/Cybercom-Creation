$(document).ready(function () {
  let usersData = JSON.parse(localStorage.getItem("usersData")) || [];
  //if usersData is empty its mean admin not registerd ,means we hide registerbutton when the admin is registered
  if (usersData.length) {
    $("#RegisterNowButton").hide();
    $("#or").hide();
  }
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    // const formValid = formValidation(email, password);
    let email = $("#email").val();
    let password = $("#password").val();

    //basic login functionality for all user
    usersData.forEach((user) => {
      console.log(email);
      console.log(user.email);
      if (email == user.email && password == user.password && user.isAdmin) {
        //user is admin

        //creating
        const loggedUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        alert("Logged in as Admin");
        window.location.href = "http://127.0.0.1:5500/HTML/Dashboard.html";
      } else {
        const loggedUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        alert("Logged in as User");
        // window.location.href = "http://127.0.0.1:5500/HTML/Sub_user.html";
      }
    });
  });

  $("#RegisterNowButton").click(function () {
    window.location.href = "http://127.0.0.1:5500/HTML/Registration.html";
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
