let registrationForm = document.getElementById("registrationForm");
// let showButton = document.getElementById("showProductButton");
let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let inputconformPassword = document.getElementById("conformPassword");
let selectCity = document.getElementById("selectCity");
let selectState = document.getElementById("selectState");
let checkTerm = document.getElementById("termCheckBox");

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let Name = inputName.value;
  let Email = inputEmail.value;
  let Password = inputPassword.value;
  let conformPassword = inputconformPassword.value;
  let City = selectCity.value;
  let State = selectState.value;

  const formValid = formValidation(
    Name,
    Email,
    Password,
    conformPassword,
    City,
    State
  );
  if (formValid) {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    //creating unique id for users
    let user_id = Date.now();
    let userInfo = {
      id: user_id,
      name: Name,
      email: Email,
      password: Password,
      city: City,
      state: State,
      isAdmin: true,
    };
    usersData.push(userInfo);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    alert("User Registration Successfully");
    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
  }
});

function formValidation(
  inputName,
  inputEmail,
  inputPassword,
  inputconformPassword,
  selectCity,
  selectState
) {
  let valid = true;

  if (inputName === "") {
    document.getElementById("name_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("name_error").innerText = "";
  }

  if (inputEmail === "") {
    document.getElementById("email_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("email_error").innerText = "";
  }
  if (inputPassword === "") {
    document.getElementById("password_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("password_error").innerText = "";
  }
  if (inputPassword !== inputconformPassword) {
    document.getElementById("ConformPassword_error").innerText =
      "Password Mismatch";
    valid = false;
  } else {
    document.getElementById("ConformPassword_error").innerText = "";
  }
  if (selectCity === "") {
    document.getElementById("city_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("city_error").innerText = "";
  }
  if (selectState === "") {
    document.getElementById("state_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("state_error").innerText = "";
  }
  if (!checkTerm.checked) {
    document.getElementById("checkbox_error").innerText =
      "Please Read Term and conditions";
    valid = false;
  } else {
    document.getElementById("checkbox_error").innerText = "";
  }

  return valid;
}
