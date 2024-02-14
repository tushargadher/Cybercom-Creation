let appointmentForm = document.getElementById("appointmentForm");
let selectDoctor = document.getElementById("selectDoctor");
const urlParams = new URLSearchParams(window.location.search);
const appointmentId = parseInt(urlParams.get("apointmentId"));
let bookButton = document.getElementById("bookButton");

const bindFormData = (appointmentId) => {
  bookButton.value = "Reschedule";
  const bookedAppoints =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
  const filterData = bookedAppoints.filter(
    (appointment) => appointment.appointment_id === appointmentId
  );
  const { patientName, doctor, date } = filterData[0];
  document.getElementById("patientName").value = patientName;
  document.getElementById("selectDoctor").value = doctor;
  document.getElementById("date").value = date;
};

//render doctor for booking apportment
const renderDoctorList = () => {
  let doctorList = JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorList));

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

// display time slot according to availbility of selected doctor
const renderTimeslots = () => {
  let option = selectDoctor.options[selectDoctor.selectedIndex];
  let doctor_id = parseInt(option.getAttribute("data-id"));
  //   console.log(doctor_id);
  let doctorTimeslots =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorAvailbility)) || [];
  let filterTimeslots = doctorTimeslots.filter((doctor) => {
    return doctor.doctor_id === doctor_id;
  });

  const container = document.getElementById("timeSlot");
  container.innerHTML = `<option value="">Select Time Slot</option>`;

  if (filterTimeslots.length) {
    filterTimeslots.forEach((doctor) => {
      let optionValues = doctor.availbleTimeSlots;
      optionValues.forEach((timeSlot) => {
        let htmlData = `<option value="${timeSlot}">${timeSlot}</option>`;
        container.insertAdjacentHTML("beforeend", htmlData);
      });
    });
  } else {
    let htmlData = `<option value="Doctor not availble">Doctor Not Available</option>`;
    container.insertAdjacentHTML("beforeend", htmlData);
  }
};

renderDoctorList();

//book appointment form
appointmentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let patientName = document.getElementById("patientName").value;
  let doctorName = document.getElementById("selectDoctor").value;
  let option = selectDoctor.options[selectDoctor.selectedIndex];
  let doctor_id = parseInt(option.getAttribute("data-id"));
  let date = document.getElementById("date").value;
  let timeSlot = document.getElementById("timeSlot").value;
  let selectedDate = new Date(date);
  var today = new Date();
  if (selectedDate < today) {
    alert("Please select a future or today's date.");
    return;
  }

  const bookedAppoints =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.BookedAppointments)) || [];
  let filterIndex = bookedAppoints.findIndex(
    (appointment) => appointment.appointment_id === appointmentId
  );
  console.log(filterIndex);
  if (filterIndex !== -1) {
    console.log("before");
    console.log(bookedAppoints[filterIndex]);
    bookedAppoints[filterIndex] = {
      ...bookedAppoints[filterIndex],
      date: date,
      timeSlot: timeSlot,
      doctorRemark: "Not Reviewed",
    };
    console.log("after");
    console.log(bookedAppoints[filterIndex]);
    localStorage.setItem(
      LOCALSTORAGE.BookedAppointments,
      JSON.stringify(bookedAppoints)
    );
  } else {
    let appointment = {
      appointment_id: Date.now(),
      patientName: patientName,
      patient_Id: loginUser.id,
      doctor: doctorName,
      doctor_id: doctor_id,
      date: date,
      timeSlot: timeSlot,
      doctorRemark: "Not Reviewed",
    };

    bookedAppoints.push(appointment);
    localStorage.setItem(
      LOCALSTORAGE.BookedAppointments,
      JSON.stringify(bookedAppoints)
    );
  }

  alert(
    "Your Appointment is Booked! you can see appointment status into dashboard"
  );
  appointmentForm.reset();
  window.location.href = "/patient/html/dashboard.html";
});

if (appointmentId) {
  bindFormData(appointmentId);
}

//when user select doctor , then render timeslot according to selected doctor
selectDoctor.addEventListener("change", renderTimeslots);
