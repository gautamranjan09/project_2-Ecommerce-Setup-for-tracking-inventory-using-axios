let sum = 0;
const pTag = document.querySelector("p");
//pTag.innerHTML=`Rs+${sum}`;
function handleFormSubmit(event) {
  event.preventDefault();
  const productDetails = {
    product: event.target.product.value,
    price: event.target.price.value,
  };
  //console.log(productDetails);
  axios
    .post(
      "https://crudcrud.com/api/b780a35b8e3b405a9da3ccb9f751b60c/inventoryData",
      productDetails
    )
    .then((response) => {
      displayProductDataOnScreen(response.data);
      sum = sum + Number(response.data.price);
      //console.log(sum);
      pTag.innerHTML = `Rs ${sum}`;
    })
    .catch((err) => {
      console.log(err);
      console.log("error");
    });
  event.target.product.value = "";
  event.target.price.value = "";
}

function displayProductDataOnScreen(productDetails) {
  console.log(productDetails);
  const productList = document.querySelector("ul");
  const newPoduct = document.createElement("li");
  //newPoduct.innerHTML="jhj";
  const text = document.createTextNode(
    `${productDetails.product} - ${productDetails.price}`
  );
  newPoduct.appendChild(text);
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete Product"));
  newPoduct.appendChild(deleteBtn);
  productList.append(newPoduct);

  deleteBtn.addEventListener("click", function (event) {
    axios
      .delete(
        `https://crudcrud.com/api/b780a35b8e3b405a9da3ccb9f751b60c/inventoryData/${productDetails._id}`
      )
      .then(() => {
        event.target.parentElement.remove();
        sum = sum - Number(productDetails.price);
        pTag.innerHTML = `Rs ${sum}`;
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get(
      "https://crudcrud.com/api/b780a35b8e3b405a9da3ccb9f751b60c/inventoryData"
    )
    .then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        sum = Number(response.data[i].price) + sum;
        displayProductDataOnScreen(response.data[i]);
      }
      pTag.innerHTML = `Rs ${sum}`;
    });
});
