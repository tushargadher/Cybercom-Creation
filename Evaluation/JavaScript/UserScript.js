let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
console.log(loggedUser);
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

RenderUsers();
//add user
$("#addUserForm").submit(function (e) {
  e.preventDefault();

  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let birthdate = $("#birthdate").val();
  const formValid = formValidation(name, email, password, birthdate);

  if (formValid) {
    let tableData = JSON.parse(localStorage.getItem("usersData")) || [];
    let updateUserId = parseInt(
      document.getElementById("AddUserButton").getAttribute("data-id")
    );
    if (updateUserId) {
      console.log(typeof updateUserId);
      updateUser(updateUserId);
    } else {
      console.log("If else working, in else section");
      let user_id = Date.now();
      tableData = [
        ...tableData,
        {
          id: user_id,
          name: name,
          email: email,
          password: password,
          birthdate: birthdate,
          isAdmin: false,
          loginTime: null,
          logoutTime: null,
        },
      ];
      localStorage.setItem("usersData", JSON.stringify(tableData));
      addUserForm.reset();
      alert("New user Added");
      RenderUsers();
    }
  }
});

function calculateAge(userBirthYear) {
  let currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  let date = new Date(userBirthYear);
  let birthYear = date.getFullYear();
  return currentYear - birthYear;
}
function BindEditUserDate(userId) {
  $("#AddUserButton").attr("data-id", userId); //adding data-id so we can check form is for updating user or adding new user
  $("#AddUserButton").attr("value", "Update User");
  $("#userPageHeading").html("Update User");
  let tableData = JSON.parse(localStorage.getItem("usersData")) || [];
  let userDetails = tableData.find((user) => user.id === userId);
  // bind user data to input felid
  $("#name").val(userDetails.name);
  $("#email").val(userDetails.email);
  $("#password").val(userDetails.password);
  $("#birthdate").val(userDetails.birthdate);
}
function updateUser(userId) {
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let birthdate = $("#birthdate").val();
  //get the value of uesrinput feild

  let tableData = JSON.parse(localStorage.getItem("usersData")) || [];
  if (tableData && tableData.length > 0) {
    const indexOfuser = tableData.findIndex((user) => user.id === userId);
    console.log(tableData[indexOfuser]);
    if (indexOfuser >= 0) {
      //editing the user
      tableData[indexOfuser] = {
        ...tableData[indexOfuser],
        name: name,
        email: email,
        password: password,
        birthdate: birthdate,
      };
      console.log(tableData[indexOfuser]);
      localStorage.setItem("usersData", JSON.stringify(tableData));
    }
    RenderUsers();
  }
  $("#addUserForm")[0].reset();
  alert("User Updated");
  $("#AddUserButton").attr("value", "Add User");
  $("#userPageHeading").html("Add User");
  $("#AddUserButton").removeAttr("data-id");
}

//delete user function
function deleteUser(userId) {
  let confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    let tableData = JSON.parse(localStorage.getItem("usersData")) || [];

    let userIndex = tableData.findIndex((user) => user.id === userId);
    if (userIndex >= 0) {
      tableData.splice(userIndex, 1);
      localStorage.setItem("usersData", JSON.stringify(tableData));
    }
    RenderUsers();
  }
}

//RederUser function
function RenderUsers() {
  console.log("new redner");
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  const usersData = JSON.parse(localStorage.getItem("usersData")) || [];

  if (!usersData.length) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "No user Added Yet...";
    row.appendChild(td);
    tbody.appendChild(row);
    return;
  } else {
    usersData.forEach((user) => {
      //only display sub user details
      if (!user.isAdmin) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td><a href="mailto:${user.email}">${user.email}</a></td>
            <td>${user.password}</td>
            <td>${user.birthdate}</td>
            <td>${calculateAge(user.birthdate)}</td>
            <td>
              <a onClick="BindEditUserDate(${user.id});">Edit</a>
              <a onClick="deleteUser(${user.id});">Delete</a>
            </td>
          `;
        tbody.appendChild(row);
      }
    });
  }
}

//form validation function
function formValidation(name, email, password, birthdate) {
  let valid = true;
  if (name === "") {
    document.getElementById("name_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("name_error").innerText = "";
  }

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
  if (birthdate === "") {
    document.getElementById("birthday_error").innerText = "Required Felid";
    valid = false;
  } else {
    document.getElementById("birthday_error").innerText = "";
  }
  return valid;
}
