$(document).ready(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    console.log("submit");
    if (validateForm()) {
      alert("your details has been added successfully");
      $("#form")[0].reset();
    } else {
      alert("Please Enter Data into Feild");
    }
  });
  $("#patientEmail").keyup(function () {
    validateEmail();
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

  if (!gender) {
    setInvalidInput($("#gender"), $("#gender_error"), "Please Select Gender");
    return false;
  }
  if (!txtFirstName) {
    setInvalidInput(
      $("#txtFirstName"),
      $("#firstname_error"),
      "Please Enter Firstname"
    );
    return false;
  }
  if (!txtLastName) {
    setInvalidInput(
      $("#txtLastName"),
      $("#lastname_error"),
      "Please Enter Lastname"
    );
    return false;
  }
  if (!month) {
    setInvalidInput($("#month"), $("#month_error"), "Please Enter Month");
    return false;
  }
  if (!day) {
    setInvalidInput($("#day"), $("#day_error"), "Please Enter Day");
    return false;
  }
  if (!year) {
    setInvalidInput($("#year"), $("#year_error"), "Please Enter Year");
    return false;
  }
  if (patientHeight <= 0) {
    setInvalidInput(
      $("#patientHeight"),
      $("#patientHeight_error"),
      "Please Enter valid Height"
    );
    return false;
  }
  if (patientWeight <= 0) {
    setInvalidInput(
      $("#patientWeight"),
      $("#patientWeight_error"),
      "Please Enter valid Weight"
    );
    return false;
  }
  if (!patientEmail) {
    setInvalidInput(
      $("#patientEmail"),
      $("#patientEmail_error"),
      "Please Enter Email"
    );
    return false;
  }
  if (!visitReason) {
    setInvalidInput(
      $("#visitReason"),
      $("#visitReason_error"),
      "Please Enter Visit Reason"
    );
    return false;
  }
  return true;
}
function validateEmail() {
  let email = $("#patientEmail").val();
  let regularExpression = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  // let regularExpression = [a-zA-Z0-9_\-\.]+@[a-z]+[\.][a-z]{2,3};

  if (regularExpression.test(email)) {
    $("#patientEmail").css("border", "2px solid green");
    $("#patientEmail_error").html("Vaild").css("color", "green");
  } else {
    $("#patientEmail").css("border", "2px solid red");
    $("#patientEmail_error").html("Not Vaild").css("color", "red");
  }
}
function setInvalidInput(element, errorElement, errorMessage) {
  element.css("border", "2px solid red");
  errorElement.html(errorMessage).css("color", "red");
}
