let logout = document.getElementById("logoutButton");
logout.addEventListener("click", () => {
  let confromed = confirm("Are you sure to logout ?");
  if (confromed) {
    sessionStorage.removeItem(SESSIONSTORAGE.loggedUser);
  }
});
let availbilityForm = document.getElementById("availabilityForm");
let timesSlot = document.getElementsByName("timeSlot");
let availabilityButton = document.getElementById("availabilityButton");


const displayAvailbility = () => {
  let availbilityList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorAvailbility)) || [];

  if (availbilityList.length) {
    let filterDocter = availbilityList.filter(
      (item) => item.doctor_id === loginUser.id
    );

    if (filterDocter.length) {
      availabilityButton.value = "Update Availability";
      filterDocter.forEach((doctor) => {
        doctor.availbleTimeSlots.forEach((option) => {
          timesSlot.forEach((checkBox) => {
            if (checkBox.value === option) {
              checkBox.checked = true;
            }
          });
        });
      });
    } else {
      availabilityButton.value = "Set Availability";
    }
  }
};
displayAvailbility();
availbilityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let availbilityList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.doctorAvailbility)) || [];
  let doctorIndex = availbilityList.findIndex(
    (doctor) => doctor.doctor_id === loginUser.id
  );

  let selectedTimeslop = [];
  timesSlot.forEach((checkBox) => {
    if (checkBox.checked) {
      selectedTimeslop.push(checkBox.value);
    }
  });

  if (!selectedTimeslop.length) {
    alert("Please select timeslot");
    return;
  }
  //if doctorindex is -1 it means doctor not in avaibilitylist
  if (doctorIndex !== -1) {
    //update timeslot
    availbilityList[doctorIndex].availbleTimeSlots = selectedTimeslop;
  } else {
    //add new timeslot
    let timeSlotList = {
      doctor_id: loginUser.id,
      availbleTimeSlots: selectedTimeslop,
    };
    availbilityList.push(timeSlotList);
  }

  localStorage.setItem(
    LOCALSTORAGE.doctorAvailbility,
    JSON.stringify(availbilityList)
  );
  alert("Availbility Added");
  availbilityForm.reset();
  displayAvailbility();
});
