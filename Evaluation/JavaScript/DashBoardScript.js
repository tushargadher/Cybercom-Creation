let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
if (loggedUser) {
  $("#loginUserName").html(`Hello ,${loggedUser.name}`);
} else {
  alert("Please Login to access portal");
  window.location.href = "http://127.0.0.1:5500/HTML/login.html";
}
if (!loggedUser.isAdmin) {
  $("#userSessionLink").hide();
  $("#usersLink").hide();
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
const checkBirthDay = (user) => {
  let birthdate = new Date(user.birthdate);
  // let birthday = birthdate.getDay() + 1;
  let birthmonth = birthdate.getMonth() + 1;
  let birthYear = birthdate.getFullYear();
  let currentTime = new Date();
  let currentmonth = currentTime.getMonth() + 1;
  let currentYear = currentTime.getFullYear();
  console.log(birthmonth, birthYear);
  console.log(currentmonth, currentYear);

  if (birthmonth == currentmonth && birthYear == currentYear) {
    document.getElementById(
      "birthDayTag"
    ).innerHTML = `<h2>Today's is  ${user.name} Birthday</h2>`;
  }
};

let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

const minorPeoples = usersData.filter((user) => {
  checkBirthDay(user);
  let age = calculateAge(user.birthdate);
  console.log(age);
  if (age < 18) {
    return user;
  }
});
console.log(minorPeoples);
$("#minorPeoples").html(`${minorPeoples.length} Users`);

const AdultPeoples = usersData.filter((user) => {
  let age = calculateAge(user.birthdate);
  if (age >= 18 && age < 50) {
    return user;
  }
});
console.log(AdultPeoples);
$("#AdultPeoples").html(`${AdultPeoples.length} Users`);

const seniorPeoples = usersData.filter((user) => {
  let age = calculateAge(user.birthdate);
  if (age > 50) {
    return user;
  }
});
console.log(seniorPeoples);
$("#seniorPeoples").html(`${seniorPeoples.length} Users`);

function calculateAge(userBirthYear) {
  let currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  let date = new Date(userBirthYear);
  let birthYear = date.getFullYear();
  // console.log(parseInt(currentYear - birthYear));
  return currentYear - birthYear;
}
