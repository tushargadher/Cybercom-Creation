$(document).ready(function () {
  let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  console.log(usersData);
  //if usersData is empty its mean admin is not registerd ,so we will display register button else we hide button
  if (usersData.length) {
    $("#RegisterNowButton").hide();
    $("#or").hide();
  }
  $("#loginForm").submit(function (e) {
    e.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    const formValid = formValidation(email, password);
    if (formValid) {
      //if the user with given email is found then we will do login process else we show error like "user not found"
      const filterUser = usersData.filter((user) => user.email === email);
      if (filterUser.length) {
        if (
          email === filterUser[0].email &&
          password === filterUser[0].password
        ) {
          //after login update the value of login time
          let indexOfUser = usersData.findIndex(
            (user) => user.id === filterUser[0].id
          );
          if (indexOfUser >= 0) {
            //updating value of use
            usersData[indexOfUser] = {
              ...usersData[indexOfUser],
              loginTime: new Date().toLocaleString(),
            };
            console.log(usersData[indexOfUser]);
            localStorage.setItem("usersData", JSON.stringify(usersData));
          }
          const loggedUser = {
            id: filterUser[0].id,
            name: filterUser[0].name,
            email: filterUser[0].email,
            isAdmin: filterUser[0].isAdmin,
            birthdate: filterUser[0].birthdate,
          };
          sessionStorage.setItem("loggedUser", JSON.stringify(loggedUser));

          if (filterUser[0].isAdmin) {
            alert("Logged in as Admin");
            window.location.href = "http://127.0.0.1:5500/HTML/Dashboard.html";
          } else {
            alert("Logged in as User");
            window.location.href = "http://127.0.0.1:5500/HTML/Sub_user.html";
          }
        } else {
          alert("Please Check Your Login Credentials !");
        }
      } else {
        alert("User Not Found");
      }
    } else {
      console.log("Fomr invails");
    }
  });

  $("#RegisterNowButton").click(function () {
    window.location.href = "http://127.0.0.1:5500/HTML/Registration.html";
  });
});

function formValidation(email, password) {
  let valid = true;
  if (email === "") {
    $("#email_error").html("Required Felid");
    valid = false;
  } else {
    $("#email_error").html("");
  }
  if (password === "") {
    $("#password_error").html("Required Felid");
    valid = false;
  } else {
    $("#password_error").html("");
  }
  return valid;
}
