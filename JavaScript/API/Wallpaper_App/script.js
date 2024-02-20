$(document).ready(function () {
  displaySavedWallpaper();
});
LOCALSTORAGE = {
  savedImages: "imageList",
};
const API_KEY = "EjRoH6yoj-NnBpAGd5ayqVRl-PfN-wOBkmzjL6EB7Hs";

let page = 1;
const handleRemove = (id) => {
  let conform = confirm("Remove Wallpaper ?");
  if (conform) {
    const imageList =
      JSON.parse(localStorage.getItem(LOCALSTORAGE.savedImages)) || [];

    filterList = imageList.filter((image) => image.id !== id);
    localStorage.setItem(LOCALSTORAGE.savedImages, JSON.stringify(filterList));
    displaySavedWallpaper();
  }
};
const displaySavedWallpaper = () => {
  const container = document.querySelector(".savedwallpaper");
  container.innerHTML = "";
  const imageList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.savedImages)) || [];

  if (imageList.length) {
    imageList.forEach((image) => {
      let div = document.createElement("div");
      div.setAttribute("class", "card mb-3");
      const HTMLDATA = `
                <img src=${image.url} class="card-img-top"/>
                <div class="card-body">
                  <button class="btn btn-danger border-0" onClick="handleRemove('${image.id}')">Remove</button>
                </div>`;
      div.innerHTML = HTMLDATA;
      container.appendChild(div);
    });
  } else {
    container.innerHTML = "<h4>No Saved Wallpaper</h4>";
  }
};

const handleSave = (id, url) => {
  const imageList =
    JSON.parse(localStorage.getItem(LOCALSTORAGE.savedImages)) || [];
  let newImage = { id, url };
  imageList.push(newImage);
  localStorage.setItem(LOCALSTORAGE.savedImages, JSON.stringify(imageList));
  alert("wallpaper saved");
  displaySavedWallpaper();
};

const renderWallaper = (data) => {
  //   console.log(data);
  const container = document.querySelector(".resultList");
  container.innerHTML = "";
  if (data.length) {
    data.forEach((image) => {
      let div = document.createElement("div");
      div.setAttribute("class", "card mb-3 result-card");
      const HTMLDATA = `
              <img src=${image.urls.regular} class="card-img-top"/>
              <div class="card-body">
                <button class="btn btn-secondary border-0" onClick="handleSave('${image.id}','${image.urls.regular}')">Save</button>
              </div>`;
      div.innerHTML = HTMLDATA;
      container.appendChild(div);
      //   console.log(image.links.download);
    });
  } else {
    container.innerHTML =
      "<h3>Couldn't find any wallpapers matching your search query</h3>";
    $(".buttons").addClass("d-none");
  }
};
const handlePrevious = () => {
  if (page === 1) {
    alert("You are already on first page");
    return;
  }
  page--;
  APICALL(page);
};
const handleNext = () => {
  page++;
  APICALL(page);
};
const APICALL = (page) => {
  console.log(page);
  let keyword = $("#inputSearch").val();
  $.ajax({
    url: `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${API_KEY}`,
    type: "GET",
    beforeSend: function () {
      $(".spinner-border").removeClass("d-none");
    },
    success: function (response) {
      $(".spinner-border").addClass("d-none");

      $(".buttons").removeClass("d-none");
      console.log(response);
      renderWallaper(response.results);
    },
    error: function (error) {
      $(".buttons").addClass("d-none");
      console.log(error);
    },
  });
};
