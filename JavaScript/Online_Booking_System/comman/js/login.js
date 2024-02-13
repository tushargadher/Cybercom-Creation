document.getElementById("RegisterNowButton").addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:5500/comman/html/register.html";
});

let loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const userTypeSelect = document.getElementById("userType");
const LOCALSTORAGE = {
  doctorList: "doctorList",
  patientList: "patientList",
};

const SESSIONSTORAGE = {
  loggedUser: "loggedUser",
};

const formValidation = () => {
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let userType = userTypeSelect.value;
  let errors = false;

  document.getElementById("email_error").textContent = "";
  document.getElementById("password_error").textContent = "";
  document.getElementById("userType_error").textContent = "";

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

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return errors;
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputEmail = emailInput.value.trim();
  let inputPassword = passwordInput.value;
  let userType = userTypeSelect.value;
  let fromValidate = formValidation();

  if (fromValidate) return;

  if (userType === "doctor") {
    let doctorList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorList)) || [];
    const filterUser = doctorList.filter((user) => user.email === inputEmail);

    if (filterUser.length) {
      const { id, email, password, userType, name } = filterUser[0];
      if (inputEmail === email && inputPassword === password) {
        const loggedUser = {
          id: id,
          name: name,
          email: email.toLowerCase(), //lower
          userType: userType,
        };
        sessionStorage.setItem(
          SESSIONSTORAGE.loggedUser,
          JSON.stringify(loggedUser)
        );
        window.location.href =
          "http://127.0.0.1:5500/docter/html/dashboard.html";
      }
    } else {
      alert("Doctor Not Found");
    }
  } else {
    let patientList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.patientList)) || [];
    const filterUser = patientList.filter((user) => user.email === inputEmail);

    if (filterUser.length) {
      const { id, email, password, userType, name } = filterUser[0];
      if (inputEmail === email && inputPassword === password) {
        const loggedUser = {
          id: id,
          name: name,
          email: email.toLowerCase(), //lower
          userType: userType,
        };
        sessionStorage.setItem(
          SESSIONSTORAGE.loggedUser,
          JSON.stringify(loggedUser)
        );
        window.location.href =
          "http://127.0.0.1:5500/patient/html/dashboard.html";
      }
    } else {
      alert("Patient Not Found");
    }
  }
});
