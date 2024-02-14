let logoutBtn = document.getElementById("logoutButton");
logoutBtn.addEventListener("click", () => {
  let confromed = confirm("Are you sure to logout ?");
  if (confromed) {
    sessionStorage.removeItem(SESSIONSTORAGE.loggedUser);
  }
});
const handleAccept = (id) => {
  let confirmed = confirm("Are you sure to accept appointment ?");
  if (confirmed) {
    const bookedAppoints =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
    let appointmentIndex = bookedAppoints.findIndex(
      (appointment) => appointment.appointment_id === id
    );

    bookedAppoints[appointmentIndex] = {
      ...bookedAppoints[appointmentIndex],
      doctorRemark: "Appoinment Accpeted",
    };

    localStorage.setItem(
      LOCALSTORAGE.BookedAppointments,
      JSON.stringify(bookedAppoints)
    );
    rednerAppointment();
    alert("Appointment Accepeted...Patient will be notified.");
  }
};
const handleDecline = (id) => {
  let confirmed = confirm("Are you sure to decline this appointment ?");
  if (confirmed) {
    const bookedAppoints =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
    let appointmentIndex = bookedAppoints.findIndex(
      (appointment) => appointment.appointment_id === id
    );
    // console.log(bookedAppoints[appointmentIndex]);
    bookedAppoints[appointmentIndex] = {
      ...bookedAppoints[appointmentIndex],
      doctorRemark: "Appoinment Declined",
    };

    localStorage.setItem(
      LOCALSTORAGE.BookedAppointments,
      JSON.stringify(bookedAppoints)
    );
    rednerAppointment();
    alert("Appointment Declined...Patient will be notified.");
  }
};
const Reschedule = (id) => {
  const bookedAppoints =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
  let appointmentIndex = bookedAppoints.findIndex(
    (appointment) => appointment.appointment_id === id
  );
  console.log(bookedAppoints[appointmentIndex]);
  bookedAppoints[appointmentIndex] = {
    ...bookedAppoints[appointmentIndex],
    doctorRemark: "Please Reshedule Your Appointment",
  };

  localStorage.setItem(
    LOCALSTORAGE.BookedAppointments,
    JSON.stringify(bookedAppoints)
  );
  rednerAppointment();
  alert("Appointment Reshedule message is send to patient.");
};

const rednerAppointment = () => {
  const tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  const bookedAppoints =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];

  const filterBooking = bookedAppoints.filter((appointment) => {
    return (
      appointment.doctor_id === loginUser.id &&
      appointment.doctorRemark == "Not Reviewed"
    );
  });
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
    <td>
      <button onClick="handleAccept(${booking.appointment_id})">Accept</button>
      <button onClick="handleDecline(${booking.appointment_id})">Decline</button>
      <button onClick="Reschedule(${booking.appointment_id})">Reschedule</button>
    </td>
    `;
    row.innerHTML = htmlData;
    tbody.appendChild(row);
  });
};
rednerAppointment();
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
