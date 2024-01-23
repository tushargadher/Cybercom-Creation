$(document).ready(function () {
  $("#form").validate({
    rules: {
      gender: "required",
      txtFirstName: "required",
      txtLastName: "required",
      month: "required",
      day: "required",
      year: "required",
      patientHeight: "required",
      patientWeight: "required",
      patientEmail: {
        required: true,
        email: true,
      },
      visitReason: "required",
    },
    messages: {
      gender: "Please Select Gender",
      txtFirstName: "Please enter first Name",
      txtLastName: "Please enter last name",
      month: "Please enter month",
      day: "Please enter day",
      year: "Please enter year",
      patientHeight: "Please enter height",
      patientWeight: "Please enter weight",
      patientEmail: {
        required: "Please enter email",
        patientEmail:
          "Your email address must be in the format of name@domain.com",
      },
      visitReason: "This field is required.",
    },
    submitHandler: function (form) {
      // do other things for a valid form
      alert("your details has been added successfully");
      form.submit();
    },
  });
});
