const updateProductForm = `<form class='updateProduct'>
<div class="flexItem">
    <label for="product-name">Product Name:</label>
<input type="text" id="product-name" name="product-name" ><br>
</div>

<div class="flexItem">
    <label for="description">Description:</label>
<input type="text" id="description" name="description" ><br>
</div>

<div class="flexItem">
    <label for="seller">Seller:</label>
<input type="text" id="seller" name="seller" ><br>
</div>

<div class="flexItem">
    <label for="price">Price:</label>
<input type="number" id="price" name="price" step="0.01" min="0" ><br>
</div>



<button id="confirmUpdate" >Update</button>
<button id="cancel" onClick="cancelOption()">Close</button>
</form>
`;

const sendDeleteProductReq=async(e)=>{
    console.log(e);
    await fetch("http://localhost:5000/products/deleteProduct", {
    method: "DELETE",
    body: JSON.stringify({
      ProductName: productName
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": jwt,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      editOverlay.style.display = "none";
      alert("Item Deleted");
      getAllProductsAdmin();
    })
    .catch((err) => {
      console.log(err);
    });
}
const sendUpdateProductReq=async(e)=>{
    e.preventDefault();
    // console.log(e)
    const productName = document.querySelector('#confirmUpdate').dataset.productName;
    const newProductName= document.querySelector('#product-name').value;
    const newDesc= document.querySelector('#description').value;
    const newSeller= document.querySelector('#seller').value;
    const newPrice= document.querySelector('#price').value;
    // console.log(newProductName, newDesc, newSeller, newPrice);
    const updateInfo={};
    if(newProductName) updateInfo['ProductName']=newProductName;
    if(newDesc) updateInfo['ProductDescription']=newDesc;
    if(newSeller) updateInfo['Seller']=newSeller;
    if(newPrice) updateInfo['Price']=newPrice;
    await fetch("http://localhost:5000/products/editProduct", {
    method: "PUT",
    body: JSON.stringify({
      ProductName: productName,
      toUpdate: updateInfo,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": jwt,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
      editOverlay.style.display = "none";
      alert("Product is updated");
      getAllProductsAdmin();
    })
    .catch((err) => {
      console.log(err);
    });
    getAllProductsAdmin();
}
const editProduct = async (e) => {
  //   console.log("edit product : ", e.target.parentNode.parentNode.id);
  const productID = e.target.parentNode.parentNode.id;
  const productName=e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
  console.log(productName);
  overlayItem.innerHTML=updateProductForm;
  editOverlay.style.display = "block";
  document.querySelector('#confirmUpdate').dataset.productName= productName;
  document.querySelector('#confirmUpdate').addEventListener('click',sendUpdateProductReq);
};
const deleteProduct = async (e) => {
  const productID = e.target.parentNode.parentNode.id;
  const productName=e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
  overlayItem.innerHTML=`<div class="deletePrompt">
  <h3>Delete "${productName}" ??</h3>
  <div class="buttons">
      <button id="confirmDeleteProduct" onClick="sendDeleteProductReq(e,'${productName}')" >Confirm Delete</button>
      <button id="cancel" onClick="cancelOption()">Close</button>
  </div>
  </div>`;
  editOverlay.style.display = "block";
};
const pageContent = document.querySelector(".pageContent");
pageContent.addEventListener("click", (e) => {
  const buttonPressed = e.target.innerHTML;

  switch (buttonPressed) {
    case "Edit":
      editProduct(e);
      break;
    case "Delete":
      deleteProduct(e);
      break;

    default:
      break;
  }
});

const confirmUpdate = document.querySelector('#confirmUpdate');
// confirmUpdate.addEventListener('click',sendUpdateProductReq())
