// Jquery("#registrationForm").validate({
//   rules: {
//     txtFirstName: "required",
//   },
//   messages: {
//     txtFirstName: "Please enter firstname",
//   },
// });
$(document).ready(function () {
  $("#registrationForm").submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
      alert("Your Booking is Comform");
      $("#registrationForm")[0].reset();
    }
  });
  $("#email").keyup(function () {
    if (validateEmail()) {
      $("#email").css("border", "2px solid green");
      $("#emailMsg").html("Vaild");
    } else {
      $("#email").css("border", "2px solid red");
    }
  });
});
function validateForm() {
  let firstName = $("#txtFirstName").val();
  let middleName = $("#txtMiddleName").val();
  let lastName = $("#txtLastName").val();

  let birthDate = $("#birthDate").val();
  let phone = $("#phone").val();
  let address = $("#address").val();
  let journeyDate = $("#journeyDate").val();
  let JourneyFrom = $("#JourneyFrom").val();
  let JourneyTo = $("#JourneyTo").val();
  let departureTime = $("#departureTime").val();

  if (firstName == "") {
    $("#firstNameError").html(`** Please Enter Firstname`);
    return false;
  }
  if (middleName == "") {
    $("#middleNameError").html(`** Please Enter Middlename`);
    return false;
  }
  if (lastName == "") {
    $("#lastNameError").html(`** Please Enter Lastname`);
    return false;
  }
  if (birthDate == "") {
    $("#dobError").html(`** Please Enter birth date`);
    return false;
  }

  if ($("input[type=radio][name=gender]:checked").length == 0) {
    $("#genderError").html("** Please select atleast one");
    return false;
  }
  if (phone == "") {
    $("#phoneError").html(`** Please Enter Phone`);
    return false;
  }
  if (address == "") {
    $("#addressError").html(`** Please Enter Address`);
    return false;
  }
  if (journeyDate == "") {
    $("#journeyDateError").html(`** Please Enter journey date`);
    return false;
  }
  if (JourneyFrom == "") {
    $("#JourneyFromError").html(`** Please Enter Journey Starting Place`);
    return false;
  }
  if (JourneyTo == "") {
    $("#JourneyToError").html(`** Please Enter Destination Place`);
    return false;
  }
  if (departureTime == "") {
    $("#departureTimeError").html(`** Please Enter departure time`);
    return false;
  }

  return true;
}
function validateEmail() {
  let email = $("#email").val();
  let regularExpression = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  // let regularExpression = [a-zA-Z0-9_\-\.]+@[a-z]+[\.][a-z]{2,3};
  if (regularExpression.test(email)) {
    return true;
  } else {
    return false;
  }
}
