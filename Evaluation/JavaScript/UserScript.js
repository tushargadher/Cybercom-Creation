let loggedUser = JSON.parse(localStorage.getItem("AdminInfo"));

if (loggedUser.isAdmin) {
  $("#loginUserName").html(`Hello ,${loggedUser.name}`);
} else {
  // console.log();
}

displayUser();

$("#addUserForm").submit(function (e) {
  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email").val();
  let password = $("#password").val();
  let birthdate = $("#birthdate").val();
  const formValid = formValidation(name, email, password, birthdate);
  if (formValid) {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    let user_id = Date.now();
    //isAdmin is false that means this all user are not admin
    let user = {
      id: user_id,
      name: name,
      email: email,
      password: password,
      birthdate: birthdate,
      isAdmin: false,
    };
    usersData.push(user);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    addUserForm.reset();
    alert("user added");
    displayUser();
  }
});

//display user function
function displayUser() {
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
  }
  usersData.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.birthdate}</td>
        <td></td>

        <td>
          <button onClick="editUser(${user});">Edit</button>
          <button onClick="deleteUser(${user.id});">Delete</button>
        </td>
      `;
    tbody.appendChild(row);
  });
}
function calculateAge(birthYear) {
  console.log(birthYear);
}
function editUser(user) {
  $("#name").val(user.name);
  $("#email").val(user.email);
  $("#password").val(user.password);
  $("#birthdate").val(user.birthdate);
}
function deleteUser(userId) {
  let conform = confirm("Are you sure to delete this user?");
  if (conform) {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    const newusersData = usersData.filter((user) => {
      return userId != user.id;
    });
    localStorage.setItem("usersData", JSON.stringify(newusersData));
    displayUser();
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
