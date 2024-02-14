const LOCALSTORAGE = {
  BookedAppointments: "bookedAppoints",
  userList: "userList",
  doctorAvailbility: "doctorAvailbility",
};
const SESSIONSTORAGE = {
  loggedUser: "loggedUser",
};
//if user is not logged in then redirect to login page
const loginUser = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.loggedUser));
// console.log(loginUser);
if (!loginUser) {
  alert("Please login to access portal");
  window.location.href = "/loginSignUP/html/login.html";
}
document.getElementById("doctorName").innerHTML = `Doctor  ${loginUser.name}`;
let logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
  let confromed = confirm("Are you sure to logout ?");
  if (confromed) {
    sessionStorage.removeItem(SESSIONSTORAGE.loggedUser);
  }
});

const rednerAccepted = () => {
  const tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  const bookedAppoints =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
  const filterBooking = bookedAppoints.filter((appointment) => {
    return (
      appointment.doctor_id === loginUser.id &&
      appointment.doctorRemark == "Appoinment Accpeted"
    );
  });
//   console.log(filterBooking);
  if (!filterBooking.length) {
    document.getElementsByTagName("table")[0].innerHTML =
      "<span>No Appointment Yet</span>";
  }
  filterBooking.forEach((booking) => {
    let row = document.createElement("tr");
    let htmlData = `
      <td>${booking.patientName}</td>
      <td>${booking.appointment_id}</td>
      <td>${booking.doctor}</td>
      <td>${booking.date}</td>
      <td>${booking.timeSlot}</td>
  
      `;
    row.innerHTML = htmlData;
    tbody.appendChild(row);
  });
};
rednerAccepted();
// {
//     "appointment_id": 1707892717218,
//     "patientName": "Fenil",
//     "patient_Id": 1707892674067,
//     "doctor": "Tushar Gadher",
//     "doctor_id": 1707892481083,
//     "date": "2024-02-15",
//     "timeSlot": "10:00 AM - 11:00 AM",
//     "doctorRemark": "Not Reviewed"
//   },
