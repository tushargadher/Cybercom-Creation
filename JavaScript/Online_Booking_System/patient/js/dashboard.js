const SESSIONSTORAGE = {
  loggedUser: "loggedUser",
};
//if user is not logged in then redirect to login page
const loginUser = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.loggedUser));
console.log(loginUser);
if (!loginUser) {
  alert("Please login to access portal");
  window.location.href = "http://127.0.0.1:5500/comman/html/login.html";
}

let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  let confromed = confirm("Are you sure to logout ?");
  if (confromed) {
    sessionStorage.removeItem(SESSIONSTORAGE.loggedUser);
  }
});

const container = document.getElementsByClassName("patientInfo")[0];
const displayPatientInfo = () => {
  const loggedUser = JSON.parse(
    sessionStorage.getItem(SESSIONSTORAGE.loggedUser)
  );
  //   const container = document.getElementsByClassName("patientInfo")[0];
  const HTMLDATA = `  <span><b>Name</b> : ${loggedUser.name}</span>
    <span><b>Patient Id</b> : ${loggedUser.id}</span>
    <span><b>Patient Email</b>:${loggedUser.email}</span>`;
  container.innerHTML = HTMLDATA;
};

if (container) {
  displayPatientInfo();
}
