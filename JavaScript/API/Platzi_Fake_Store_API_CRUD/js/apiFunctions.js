let API = "https://api.escuelajs.co/api/v1/products";
let categoriesDropDown = document.getElementById("categoryId");
let offset = 0;
let limit = 10;
let currentProduct = [];
const showPopUpLoader = () => {
  overlay.classList.remove("hide");
  overlay.classList.add("show");
};
const hidePopUpLoader = () => {
  overlay.classList.remove("show");
  overlay.classList.add("hide");
};
const handlePrevious = () => {
  nextButton.disabled = false;
  nextButton.style.opacity = 1;
  if (!offset) {
    alert("You are on first page");
    return;
  }
  offset = offset - limit;
  getProduct();
};
const handleNext = () => {
  offset = offset + limit;
  getProduct();
};

const getProduct = () => {
  showLoader();
  //   console.log(`${API}?offset=${offset}&limit=${limit}`);
  fetch(`${API}?offset=${offset}&limit=${limit}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Can't Get the products");
      }
      return response.json();
    })
    .then((response) => {
      hideLoader();
      currentProduct = [...response];
      renderProduct(response);
      if (response.length < limit) {
        alert("You have reached last page");
        nextButton.disabled = true;
        nextButton.style.opacity = 0.5;
      }
    })
    .catch((error) => {
      hideLoader();
      console.log(error);
    });
};
const addProducts = (dataObj) => {
  showPopUpLoader();
  fetch(`${API}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  })
    .then((response) => {
      if (!response.ok) {
        hidePopUpLoader();
        throw new Error("Error while Adding Product");
      }
      return response.json();
    })
    .then((response) => {
      hidePopUpLoader();
      alert(`Product ${response.title} has been added`);
      ProductForm.reset();
      let confirmed = confirm("Redirect to product page?");
      if (confirmed) {
        window.location.href = "http://127.0.0.1:5500/html/index.html";
      }
    })
    .catch((error) => console.log(error));
};

const getSignalProduct = (id) => {
  showPopUpLoader();
  fetch(`${API}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Can't get product");
      }
      return response.json();
    })
    .then((response) => {
      hidePopUpLoader();
      console.log(response);
      document.getElementById("title").value = response.title;
      document.getElementById("price").value = response.price;
      document.getElementById("description").value = response.description;
      document.getElementById("categoryId").value = response.category.id;
      document.getElementById("images").value = response.images;
    })
    .catch((error) => {
      hidePopUpLoader();
      console.log(error);
    });
};
const handleDelete = (id) => {
  let confirmed = confirm("Are you sure to delete this product");
  if (!confirmed) return;
  fetch(`${API}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((response) => {
      if (response) alert("Product has been deleted");
      getProduct();
    })
    .catch((error) => console.log(error));
};
const handleUpdate = (dataObj, id) => {
  showPopUpLoader();
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataObj),
  })
    .then((response) => {
      if (!response.ok) {
        hidePopUpLoader();
        throw new Error("Can't Get Product");
      }
      return response.json();
    })
    .then((response) => {
      hidePopUpLoader();
      alert(`Product ${response.title} has been updated`);
      ProductForm.reset();
      let confirmed = confirm("Redirect to product page?");
      if (confirmed) {
        window.location.href = "http://127.0.0.1:5500/html/index.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const getAllCategory = () => {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((response) => response.json())
    .then((response) => {
      if (categoriesDropDown) {
        renderCategory(response, "categoryId");
      } else {
        renderFilterCategory(response, "filterCategory");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const categoryFilter = (id) => {
  fetch(` https://api.escuelajs.co/api/v1/products/?categoryId=${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Can't find category");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      renderProduct(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
const handleSearch = (searchValue) => {
  let inputValue = searchValue.toLowerCase();
  if (inputValue) {
    fetch(`${API}/?title=${inputValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not Found");
        }
        return response.json();
      })
      .then((response) => renderProduct(response))
      .catch((error) => console.log(error));
  } else {
    getProduct();
  }
};

const handlePriceRange = (value) => {
  priceValueOp.innerText = value;

  // console.log(`${API}/?price_min=${priceRange.min}&price_max=${value}`);
  fetch(`${API}/?price_min=${priceRange.min}&price_max=${value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Can't get products using price range");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      renderProduct(response);
    })
    .catch((error) => alert(error));
};
