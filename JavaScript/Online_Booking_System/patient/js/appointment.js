const LOCALSTORAGE = {
  BookedAppointments: "bookedAppoints",
  doctorList: "doctorList",
  patientList: "patientList",
};
let appointmentForm = document.getElementById("appointmentForm");

//render doctor for booking apportment
const renderDoctor = () => {
  let doctorList = JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorList));
  console.log(doctorList);
  const container = document.getElementById("selectDoctor");
  if (doctorList.length) {
    doctorList.forEach((doctor) => {
      let htmlData = `<option value="${doctor.name}" data-id="${doctor.id}">${doctor.name}</option>`;
      container.insertAdjacentHTML("beforeend", htmlData);
    });
  } else {
    let htmlData = `<option value="">No Doctor Available</option>`;
    container.insertAdjacentHTML("afterend", htmlData);
  }
};
renderDoctor();
// display time slot according to availbility of selected doctor
appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let patientName = document.getElementById("patientName").value;
  let doctorName = document.getElementById("selectDoctor").value;
  let doctor = document.getElementById("selectDoctor");
  let option = doctor.options[doctor.selectedIndex];
  let doctor_id = parseInt(option.getAttribute("data-id"));
  let date = document.getElementById("date").value;
  let timeSlot = document.getElementById("timeSlot").value;

  let appointment = {
    appointment_id: Date.now(),
    patientName: patientName,
    patient_Id: loginUser.id,
    doctor: doctorName,
    doctor_id: doctor_id,
    date: date,
    timeSlot: timeSlot,
  };

  let appointments =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];

  appointments.push(appointment);

  localStorage.setItem(
    LOCALSTORAGE.BookedAppointments,
    JSON.stringify(appointments)
  );

  alert(
    "Your Appointment is Booked! you can see appointment status into dashboard"
  );
  appointmentForm.reset();
  window.location.href = "http://127.0.0.1:5500/patient/html/dashboard.html";
});
