let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
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

const checkBirthDay = () => {
  let birthdate = new Date(loggedUser.birthdate);
  // let birthday = birthdate.getDay() + 1;
  let birthmonth = birthdate.getMonth() + 1;
  let birthYear = birthdate.getFullYear();
  let currentTime = new Date();
  let currentmonth = currentTime.getMonth() + 1;
  let currentYear = currentTime.getFullYear();
  console.log(birthmonth, birthYear);
  console.log(currentmonth, currentYear);

  if (birthmonth == currentmonth && birthYear == currentYear) {
    document.getElementById("birthDayTag").innerHTML =
      "<h2>Happy Birthday</h2>";
  }
};

checkBirthDay();
