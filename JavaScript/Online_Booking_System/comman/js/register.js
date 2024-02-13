let registerForm = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("conformPassword");
const userTypeSelect = document.getElementById("userType");
const LOCALSTORAGE = {
  doctorList: "doctorList",
  patientList: "patientList",
};

//form validation function
const formValidation = () => {
  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  let userType = userTypeSelect.value;
  let errors = false;

  // Reset previous error messages
  document.getElementById("name_error").textContent = "";
  document.getElementById("email_error").textContent = "";
  document.getElementById("password_error").textContent = "";
  document.getElementById("ConformPassword_error").textContent = "";
  document.getElementById("userType_error").textContent = "";

  // Validation
  if (name === "") {
    document.getElementById("name_error").textContent = "Name is required";
    errors = true;
  }

  if (email === "") {
    document.getElementById("email_error").textContent = "Email is required";
    errors = true;
  } else if (!validateEmail(email)) {
    document.getElementById("email_error").textContent = "Invalid email format";
    errors = true;
  }

  if (password === "") {
    document.getElementById("password_error").textContent =
      "Password is required";
    errors = true;
  }
  if (userType === "") {
    document.getElementById("userType_error").textContent =
      "Please Select UserType";
    errors = true;
  }

  if (confirmPassword === "") {
    document.getElementById("ConformPassword_error").textContent =
      "Please enter the conform password";
    errors = true;
  } else if (password !== confirmPassword) {
    document.getElementById("ConformPassword_error").textContent =
      "Passwords do not match";
    errors = true;
  }
  // Function to validate email format
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return errors;
};
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = nameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;
  let userType = userTypeSelect.value;

  let fromValidate = formValidation();
  console.log(fromValidate);
  if (fromValidate) return;

  let patientList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.patientList)) || [];

  let doctorList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorList)) || [];

  let allUser = [...patientList, ...doctorList];
  const filterUser = allUser.filter((user) => user.email === email);
  if (filterUser.length) {
    alert("User Already Register...,Please Login");
    window.location.href = "http://127.0.0.1:5500/comman/html/login.html";
    return;
  }
  const userId = Date.now();
  const userInfo = {
    id: userId,
    name,
    email,
    password,
    userType,
  };

  if (userType === "doctor") {
    doctorList.push(userInfo);
    localStorage.setItem(LOCALSTORAGE.doctorList, JSON.stringify(doctorList));
  } else {
    patientList.push(userInfo);
    localStorage.setItem(LOCALSTORAGE.patientList, JSON.stringify(patientList));
  }

  alert("Registration Successfully");
  window.location.href = "http://127.0.0.1:5500/comman/html/login.html";
  registerForm.reset();
});
