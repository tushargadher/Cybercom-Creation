const LOCALSTORAGE = {
  BookedAppointments: "bookedAppoints",
  doctorList: "doctorList",
  patientList: "patientList",
  doctorAvailbility: "doctorAvailbility",
};
const SESSIONSTORAGE = {
  loggedUser: "loggedUser",
};
const loginUser = JSON.parse(sessionStorage.getItem(SESSIONSTORAGE.loggedUser));
let logoutButton = document.getElementById("logoutButton");
const container = document.querySelector(".patientInfo");

// console.log(loginUser);

if (!loginUser) {
  alert("Please login to access portal");
  window.location.href = "/loginSignUP/html/login.html";
}

logoutButton.addEventListener("click", () => {
  let confromed = confirm("Are you sure to logout ?");
  if (confromed) {
    sessionStorage.removeItem(SESSIONSTORAGE.loggedUser);
  }
});

const displayPatientInfo = () => {
  const loggedUser = JSON.parse(
    sessionStorage.getItem(SESSIONSTORAGE.loggedUser)
  );
  const HTMLDATA = `  <span><b>Name</b> : ${loggedUser.name}</span>
    <span><b>Patient Id</b> : ${loggedUser.id}</span>
    <span><b>Patient Email</b>:${loggedUser.email}</span>`;
  container.innerHTML = HTMLDATA;
};
if (container) {
  displayPatientInfo();
}

//render patients booked appointments
const renderBooking = () => {
  const bookingContainer = document.querySelector(".bookingContainer");
  bookingContainer.innerHTML = "";
  const bookedAppoints = JSON.parse(
    localStorage.getItem(LOCALSTORAGE.BookedAppointments)
  );
  const filterBooking = bookedAppoints.filter((appointment) => {
    return appointment.patient_Id === loginUser.id;
  });
  //   console.log(filterBooking.length);

  filterBooking.forEach((appointment) => {
    let div = document.createElement("div");
    div.setAttribute("class", "bookingDeatails");
    const HTMLDATA = `
            <span>Patient Name : <b>${appointment.patientName}</b></span>
            <span>Appointment Id : <b>${appointment.appointment_id}</b></span>
            <span>Doctor Name : <b>${appointment.doctor}</b></span>
            <span>Date :<b> ${appointment.date}</b></span>
            <span>Timing : <b>${appointment.timeSlot}</b></span>
            <span>Doctor Remark :<b>${appointment.doctorRemark}</b></span>
            ${
              appointment.doctorRemark === "Please Reshedule Your Appointment"
                ? `<span><a href="./appointment.html?apointmentId=${appointment.appointment_id}">Reschedule</a></span>`
                : ""
            }
            `;

    div.innerHTML = HTMLDATA;
    bookingContainer.appendChild(div);
  });
  bookingContainer.innerHTML = filterBooking.length
    ? bookingContainer.innerHTML
    : "<span>No Apointment is Booked Yet !";
};

renderBooking();
