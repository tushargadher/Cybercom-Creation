$(window).on("load", function () {
  $("#btn").click(function () {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users", //api call url
      type: "GET", //GET OR POST
      //   data: {},
      beforeSend: function () {
        //this function call before api call hits
        console.log("API CALLING");
        $(".spinner").removeClass("d-none");
      },
      success: function (response) {
        //onces api call send success this fuction get called
        $(".spinner").addClass("d-none");
        let html = "";

        for (let i = 0; i < response.length; i++) {
          const { id, name, email } = response[i];
          html = `
          <tr>
              <td>${id}</td>
              <td>${name}</td>
              <td>${email}</td>
          </tr>
         `;
          $(".table").find("tbody").append(html);
        }
      },
      error: function (error) {
        //if our api gets error this function gets called
        console.log(error);
        $(".spinner").addClass("d-none");
      },
    });
  });
});
