// $(document).ready(function () {
//   $("#form").validate({
//     rules: {
//       gender: "required",
//       txtFirstName: "required",
//       txtLastName: "required",
//       month: "required",
//       day: "required",
//       year: "required",
//       patientHeight: "required",
//       patientWeight: "required",
//       patientEmail: {
//         required: true,
//         email: true,
//       },
//       visitReason: "required",
//     },
//     messages: {
//       gender: "Please Select Gender",
//       txtFirstName: "Please enter first Name",
//       txtLastName: "Please enter last name",
//       month: "Please enter month",
//       day: "Please enter day",
//       year: "Please enter year",
//       patientHeight: "Please enter height",
//       patientWeight: "Please enter weight",
//       patientEmail: {
//         required: "Please enter email",
//         patientEmail:
//           "Your email address must be in the format of name@domain.com",
//       },
//       visitReason: "This field is required.",
//     },
//     submitHandler: function (form) {
//       // do other things for a valid form
//       form.submit();
//     },
//   });
// });

$(document).ready(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    console.log("submit");
    if (validateForm()) {
      alert("your details has been added successfully");
      $("#registrationForm")[0].reset();
    }
  });
  $("#patientEmail").keyup(function () {
    if (validateEmail()) {
      $("#patientEmail").css("border", "2px solid green");
      // $("#emailMsg").html("Vaild");
    } else {
      $("#patientEmail").css("border", "2px solid red");
    }
  });
});
function validateForm() {
  let gender = $("#gender").val();
  let txtFirstName = $("#txtFirstName").val();
  let txtLastName = $("#txtLastName").val();
  let month = $("#month").val();
  let day = $("#day").val();
  let year = $("#year").val();
  let patientHeight = $("#patientHeight").val();
  let patientWeight = $("#patientWeight").val();
  let patientEmail = $("#patientEmail").val();
  let visitReason = $("#visitReason").val();

  if (gender == null) {
    $("#gender_error").html(`Please Select Gender`);
    return false;
  }
  if (txtFirstName == "") {
    $("#firstname_error").html(`Please Enter Firstname`);
    return false;
  }
  if (txtLastName == "") {
    $("#lastname_error").html(`Please Enter Lastname`);
    return false;
  }
  if (month == "") {
    $("#month_error").html(`Please Enter Month`);
    return false;
  }
  if (day == "") {
    $("#day_error").html(`Please Enter Day`);
    return false;
  }
  if (year == "") {
    $("#year_error").html(`Please Enter Year`);
    return false;
  }
  if (patientHeight == "") {
    $("#patientHeight_error").html(`Please Enter Height`);
    return false;
  }
  if (patientWeight == "") {
    $("#patientWeight_error").html(`Please Enter Weight`);
    return false;
  }
  if (patientEmail == "") {
    $("#patientEmail_error").html(`Please Enter Email`);
    return false;
  }
  if (visitReason == "") {
    $("#visitReason_error").html(`Please Enter Visit Reason`);
    return false;
  }

  return true;
}
function validateEmail() {
  let email = $("#patientEmail").val();
  let regularExpression = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  // let regularExpression = [a-zA-Z0-9_\-\.]+@[a-z]+[\.][a-z]{2,3};
  if (regularExpression.test(email)) {
    return true;
  } else {
    return false;
  }
}
