//reder api data using html and css
const renderUser = (result) => {
  console.log(result.data);
  let userlist = result.data;
  const container = document.querySelector(".cotainer");
  container.innerHTML = "";
  if (userlist) {
    userlist.map((user) => {
      let card = document.createElement("div");
      card.setAttribute("class", "card");
      const HTMLDATA = `
    <div class="card" >
      <img src=${user.avatar} class="card-img-top" alt="${user.first_name}" />
      <div class="card-body">
        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
        <p class="card-text">
        Email : ${user.email}
        </p>
      </div>
    </div>
    `;
      card.innerHTML = HTMLDATA;
      container.appendChild(card);
      console.log(user);
    });
  }
  console.log(result);
};
// {
//     "id": 1,
//     "email": "george.bluth@reqres.in",
//     "first_name": "George",
//     "last_name": "Bluth",
//     "avatar": "https://reqres.in/img/faces/1-image.jpg"
//   }

//get method is used to retrive data from server
const XMLGetMethod = () => {
  console.log("Start of Function");
  //first create one instant of XMLHttpRequest object
  let xhr = new XMLHttpRequest();

  //open request
  // xhr.open(method,apiurl,async true or false) by default async is true , if we set to false then next code will not execute until api call is not complete
  //   xhr.open("GET", "https://reqres.in/api/users?page=1", true);
  xhr.open("GET", "https://reqres.in/api/users/2", true);
  //   xhr.open("GET", "https://reqres.in/api/unknown?page=3", true);

  //now call the call back function ,when xhr status changes
  // The readystatechange event is fired whenever the readyState property of the XMLHttpRequest changes.
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (xhr.response) {
        console.log(JSON.parse(xhr.response));
      }
    }
  };
  xhr.send();
  console.log("End of Function");
};

//post method is used to create new resouces on the server(add new data),in some case we can use post method to get data
const XMLPostMethod = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://reqres.in/api/users", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
      if (xhr.response) {
        console.log(JSON.parse(xhr.response));
      }
    }
  };
  xhr.send({
    name: "Tushar",
    job: "Software developer",
  });
};

const XMLPutMethod = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("PUT", "https://reqres.in/api/users/2", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (xhr.response) {
        console.log(JSON.parse(xhr.response));
      }
    }
  };
  xhr.send({
    name: "Tushar",
    job: "Software developer",
  });
};
const XMLDeleteMethod = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "https://reqres.in/api/users/2", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 204) {
      if (xhr.response) {
        console.log(JSON.parse(xhr.response));
      }
    }
  };
  xhr.send();
};

const test = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "url", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 204) {
      if (xhr.respone) {
        console.log(JSON.parse(xhr.response));
      }
    }
  };
  xhr.send({
    name: "Tushar",
    job: "Javascript",
  });
};

const fetchGet = () => {
  fetch("https://reqres.in/api/users?page=2")
    .then((response) => response.json())
    .then((result) => renderUser(result))
    .catch((error) => console.log(error));
};

const fetchPost = () => {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    body: {
      name: "Tushar",
      job: "Software Engineer",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
const postFetch=()=>{
  fetch("https://reqres.in/api/users",{
    method:"POST",
    body:{
      name:"Tushar",
      job:""
    }
  })
}
const fetchPUT = () => {
  fetch("https://reqres.in/api/users/2", {
    method: "PUT",
    body: {
      name: "Tushar Gadher",
      job: "Full Stack Developer",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

const fetchDelete = () => {
  fetch("https://reqres.in/api/users/2", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
// some info about status code
// 1xx informational response – the request was received, continuing process
// 2xx successful – the request was successfully received, understood, and accepted
// 3xx redirection – further action needs to be taken in order to complete the request
// 4xx client error – the request contains bad syntax or cannot be fulfilled
// 5xx server error – the server failed to fulfil an apparently valid request

// const addToyForm = document.querySelector('.add-toy-form')
// addToyForm.addEventListener('submit', function (event) {
//   fetch(`http://localhost:3000/toys/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: `${event.target.name.value}`,
//       image: `${event.target.image.value}`,
//       likes: 0
//     })
//   })
//     .then(resp => resp.json())
//     .then(renderToys)
// })
