const rednerAppointment = () => {
  const tbody = document.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  const bookedAppoints = JSON.parse(
    localStorage.getItem(LOCALSTORAGE.BookedAppointments)
  );
  const filterBooking = bookedAppoints.filter((docter) => {
    return docter.doctor_id === loginUser.id;
  });
  console.log(filterBooking);
  filterBooking.forEach((booking) => {
    let row = document.createElement("tr");
    let htmlData = `
    <td>${booking.patientName}</td>
    <td>${booking.patient_Id}</td>
    <td>${booking.doctor}</td>
    <td>${booking.date}</td>
    <td>${booking.timeSlot}</td>
    <td>
      <button>Accept</button>
      <button>decline</button>
      <button>reschedule</button>
    </td>
    `;
    row.innerHTML = htmlData;
    tbody.appendChild(row);
  });
};
rednerAppointment();
// {
//     "appointment_id": 1707818866994,
//     "patientName": "Tushar",
//     "patient_Id": 1707810398202,
//     "doctor": "Mitesh",
//     "doctor_id": 1707816395689,
//     "date": "2024-02-17",
//     "timeSlot": "10:00 AM - 11:00 AM"
//   },
