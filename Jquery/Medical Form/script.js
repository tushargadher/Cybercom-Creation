$(document).ready(function () {
  $("#form").submit(function (e) {
    e.preventDefault();
    if (validateForm()) {
      alert(`Missing Vaule in ${validateForm()} fields.`);
    } else {
      alert("your details has been added successfully");
      $("#form")[0].reset();
      location.reload(true);
    }
  });
  $("#patientEmail").keyup(function () {
    validateEmail();
  });
  $("#txtFirstName").keyup(function () {
    let txtFirstName = $("#txtFirstName").val();
    if (validateStringInput(txtFirstName)) {
      $("#txtFirstName").css("border", "2px solid green");
      $("#firstname_error").html(" Valid ").css("color", "green");
    } else {
      $("#txtFirstName").css("border", "2px solid red");
      $("#firstname_error").html("Not valid").css("color", "red");
    }
  });
  $("#txtLastName").keyup(function () {
    let txtLastName = $("#txtLastName").val();
    if (validateStringInput(txtLastName)) {
      $("#txtLastName").css("border", "2px solid green");
      $("#lastname_error").html("Valid").css("color", "green");
    } else {
      $("#txtLastName").css("border", "2px solid red");
      $("#lastname_error").html("Not valid").css("color", "red");
    }
  });
});
function validateForm() {
  let error = 0;
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
    error++;
  }
  if (!txtFirstName) {
    setInvalidInput(
      $("#txtFirstName"),
      $("#firstname_error"),
      "Please Enter Firstname"
    );
    error++;
  }
  if (!txtLastName) {
    setInvalidInput(
      $("#txtLastName"),
      $("#lastname_error"),
      "Please Enter Lastname"
    );
    error++;
  }
  if (!month) {
    setInvalidInput($("#month"), $("#month_error"), "Please Enter Month");
    error++;
  }
  if (!day) {
    setInvalidInput($("#day"), $("#day_error"), "Please Enter Day");
    error++;
  }
  if (!year) {
    setInvalidInput($("#year"), $("#year_error"), "Please Enter Year");
    error++;
  }
  if (patientHeight <= 0) {
    setInvalidInput(
      $("#patientHeight"),
      $("#patientHeight_error"),
      "Please Enter valid Height"
    );
    error++;
  }
  if (patientWeight <= 0) {
    setInvalidInput(
      $("#patientWeight"),
      $("#patientWeight_error"),
      "Please Enter valid Weight"
    );
    error++;
  }
  if (!patientEmail) {
    setInvalidInput(
      $("#patientEmail"),
      $("#patientEmail_error"),
      "Please Enter Email"
    );
    error++;
  }
  if (!visitReason) {
    setInvalidInput(
      $("#visitReason"),
      $("#visitReason_error"),
      "Please Enter Visit Reason"
    );
    error++;
  }
  return error;
}
function validateEmail() {
  let email = $("#patientEmail").val();
  let regularExpression = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  // let regularExpression = [a-zA-Z0-9_\-\.]+@[a-z]+[\.][a-z]{2,3};

  if (regularExpression.test(email)) {
    $("#patientEmail").css("border", "2px solid green");
    $("#patientEmail_error").html("valid").css("color", "green");
  } else {
    $("#patientEmail").css("border", "2px solid red");
    $("#patientEmail_error").html("Not valid").css("color", "red");
  }
}
function setInvalidInput(element, errorElement, errorMessage) {
  element.css("border", "2px solid red");
  errorElement.html(errorMessage).css("color", "red");
}

function validateStringInput(value) {
  let stringRegex = /^[a-zA-Z ]{2,30}$/;
  return stringRegex.test(value);
}
