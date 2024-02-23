//api functions
const getAllProduct = () => {
  showLoader();
  fetch(`https://dummyjson.com/products?skip=${skip}&limit=${PAGESIZE}`)
    .then((respone) => respone.json())
    .then((respone) => {
      hideLoader();
      PriceSort.value = "";
      RatingSort.value = "";
      totalSize = respone.total;
      limit = respone.limit;
      let productData = [...respone.products];
      let newProducts =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.newProducts)) || [];

      if (!skip) {
        let margeProduct = [...newProducts, ...productData];
        renderProduct(margeProduct);
        currentProducts = [...margeProduct];
      } else {
        renderProduct(productData);
        currentProducts = [...productData];
      }
    })
    .catch((error) => {
      hideLoader();
      console.log(error);
    });
};
//search product
const searchProduct = () => {
  showLoader();
  let keyword = productInput.value;
  fetch(`https://dummyjson.com/products/search?q=${keyword}`)
    .then((respone) => respone.json())
    .then((respone) => {
      renderProduct(respone.products);
      currentProducts = [...respone.products];
      hideLoader();
    })
    .catch((error) => {
      hideLoader();
      console.log(error);
    });
};

const deleteProduct = (id) => {
  let confirmed = confirm("Are you sure to delete this product?");
  if (!confirmed) return;

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  })
    .then((respone) => {
      if (respone.status === 200) {
        return respone.json();
      } else if (respone.status === 404) {
        let deletedProductList =
          JSON.parse(localStorage.getItem(LOCALSTORAGE.deletedProducts)) || [];
        deletedProductList.push(id);
        localStorage.setItem(
          LOCALSTORAGE.deletedProducts,
          JSON.stringify(deletedProductList)
        );
        alert(`Product has been deleted`);
        getAllProduct();
        return;
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .then((respone) => {
      if (respone) {
        let deletedProductList =
          JSON.parse(localStorage.getItem(LOCALSTORAGE.deletedProducts)) || [];
        deletedProductList.push(respone.id);
        localStorage.setItem(
          LOCALSTORAGE.deletedProducts,
          JSON.stringify(deletedProductList)
        );
        alert(`Product ${respone.title} has been deleted`);
        getAllProduct();
      }
    })
    .catch((error) => alert(error));
};
const addProduct = (formObj) => {
  console.log(formObj);
  fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObj),
  })
    .then((respone) => {
      if (respone.status === 200) return respone.json();
      throw new Error("Failed to add product");
    })
    .then((respone) => {
      console.log(respone);
      let newProducts =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.newProducts)) || [];
      let newProduct = {
        ...respone,
        id: Date.now(),
        discountPercentage: formObj.discountPercentage,
      };
      newProducts.push(newProduct);
      localStorage.setItem(
        LOCALSTORAGE.newProducts,
        JSON.stringify(newProducts)
      );
      alert(`New Product ${respone.title} has been Added`);
      getAllProduct();
      addProductForm.reset();
    })
    .catch((error) => console.log(error));
};

const getSingleProduct = (id) => {
  showPopUpLoader();
  submitButton.setAttribute("data-id", id);
  submitButton.innerText = "Update Product";
  //sereach in localstore if product not found in api
  fetch(`https://dummyjson.com/products/${id}`)
    .then((response) => {
      if (response.status === 404) {
        submitButton.innerText = "Update Product";
        let newProducts =
          JSON.parse(localStorage.getItem(LOCALSTORAGE.newProducts)) || [];
        let productData = newProducts.filter((product) => product.id === id);
        return productData[0];
      } else if (response.status === 200) {
        return response.json();
      }
    })
    .then((response) => {
      hidePopUpLoader();
      bindFormData(response);
    })
    .catch((error) => {
      submitButton.innerText = "Add Product";
      console.log(error);
    });
};

//put changes whole data , while patch does not modifies whole data
const updateProduct = (id, formData) => {
  showPopUpLoader();

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((respone) => {
      if (respone.status === 200) {
        return respone.json();
      } else if (respone.status === 404) {
      } else {
        throw new Error("Faild to update Product");
      }
    })
    .then((respone) => {
      hidePopUpLoader();
      let updatedProducts =
        JSON.parse(localStorage.getItem(LOCALSTORAGE.updatedProducts)) || [];
      let newProduct = {
        ...respone,
      };
      updatedProducts.push(newProduct);
      localStorage.setItem(
        LOCALSTORAGE.updatedProducts,
        JSON.stringify(updatedProducts)
      );
      submitButton.innerText = "Add Product";
      alert(`Product ${respone.title} has been Updated`);
      getAllProduct();
      addProductForm.reset();
    })
    .catch((error) => {
      hidePopUpLoader();
      console.log(error);
    });
};
