const editUserBtn = document.querySelector(".editUser");
const buttons = document.querySelectorAll(".allowed");
const overlayContainer = document.querySelector(".overlayContainer");
const overlayItem = document.querySelector("#overlayItem");
// const contentBody = document.querySelector(".pageContent")
const cancelOption = (e) => {
  editOverlay.style.display = "none";
};
const editForm = `
<div class="editForm">
  <label for="UserName">New UserName:</label>
  <input type="UserName" id="UserName" name="UserName"  />

  <label for="Email">New Email:</label>
  <input type="Email" id="Email" name="Email"  />

  <div class="editUserButtons">
  <button  class="button" id="editUserButton">Save</button>
  <button id="cancelEdit" onClick="cancelOption()">Cancel</button>
    </div>
</div>

`;

const deleteUserFunc = async (e) => {
  const userID = e.target.parentNode.parentNode.parentNode;
  console.log(userID);
  const userEmail = userID.dataset.email;
  console.log(userEmail);
  await fetch("http://localhost:5000/admin/deleteUser", {
    method: "DELETE",
    body: JSON.stringify({
      Email: userEmail,
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
      alert("User is Deleted !!!");
      getAllUsers();
    })
    .catch((err) => {
      console.log(err);
    });
};
const editUserFunc = async (e) => {
  const userID = e.target.parentNode.parentNode.parentNode;
  const userEmail = userID.dataset.email;
  const newEmail = document.querySelector("input#Email").value;
  const newName = document.querySelector("input#UserName").value;
  const newInfo = {};
  if (newEmail) newInfo["Email"] = newEmail;
  if (newName) newInfo["Name"] = newName;
  // console.log(newInfo)
  await fetch("http://localhost:5000/admin/editUser", {
    method: "PUT",
    body: JSON.stringify({
      Email: userEmail,
      updateInfo: newInfo,
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
      alert("User is updated");
      getAllUsers();
    })
    .catch((err) => {
      console.log(err);
    });
};
const promoteUserFunc = async (e) => {
  const userID = e.target.parentNode.parentNode.parentNode;
  // console.log(userID.dataset.userID)
  const userIDtoPromote = userID.dataset.userID;
  await fetch("http://localhost:5000/admin/promoteUser", {
    method: "PUT",
    body: JSON.stringify({
      userID: userIDtoPromote,
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
      alert("User is Now an ADMIN");
      getAllUsers();
    })
    .catch((err) => {
      console.log(err);
    });
};
const showCart = async () => {
  const cartContainer = document.querySelector("div.usersCart");
  const userID = overlayItem.dataset.userID;
  const url =
    "http://localhost:5000/admin/showUsersCartParams?userId=" + userID;

  await fetch(url, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "auth-token": jwt,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      const productsInCart = response.products;
      const allProductsInHTML = productsInCart.map((product) => {
        return `
                <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h3 class="card-title">${product.productName}</h5>
      <p class="cardSub">ID: ${product.productID}</p>
      <div class="card-text">Price: ${product.price}</div>
      <div class="card-text">Quantity: ${product.quantity}</div>
    </div>
  </div>
                `;
        
      });
      cartContainer.innerHTML=allProductsInHTML.join("");
    //   console.log(allProductsInHTML);
    });
};
contentBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("allowed")) {
    const buttonClicked = e.target.innerHTML;
    switch (buttonClicked) {
      case "Edit":
        overlayItem.innerHTML = editForm;

        overlayItem.id = e.target.parentNode.parentNode.id;
        // console.log('username: ',e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML)
        // console.log('working');
        overlayItem.dataset.email =
          e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;

        const editButton = document.getElementById("editUserButton");
        editButton.addEventListener("click", editUserFunc);
        break;
      case "Delete":
        const username =
          e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
        overlayItem.innerHTML = `<div class="deleteUser">
                <h3 class="deleteInfo">You are about to delete ${e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML}</h3>
                <div class="deleteformButtons">
                    <button id="deleteConfirm">Confirm</button>
                    <button id="cancel" onClick="cancelOption()">Cancel</button>
                </div>
            </div>`;
        overlayItem.dataset.email =
          e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
        const deleteConfirm = document.getElementById("deleteConfirm");
        deleteConfirm.addEventListener("click", (e) => {
          deleteUserFunc(e);
        });
        break;
      case "Promote":
        // const username= e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
        overlayItem.innerHTML = `<div class="promoteUser">
                <h3 class="promoteUser">Promote ${e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML} to ADMIN ?</h3>
                <div class="promoteUserbuttons">
                    <button id="promoteConfirm">Confirm</button>
                    <button id="cancel" onClick="cancelOption()">Cancel</button>
                </div>
            </div>`;
        overlayItem.dataset.userID =
          e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
        const promoteConfirm = document.getElementById("promoteConfirm");
        promoteConfirm.addEventListener("click", (e) => {
          promoteUserFunc(e);
        });
        break;
      case "cart":
        // const username= e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
        overlayItem.innerHTML = `<div class="promoteUser">
                <h4 class="promoteUser">${e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML}'s CART</h4>
                <div class="usersCart">No Items To Show</div>
                <div class="promoteUserbuttons">
                    
                    <button id="cancel" onClick="cancelOption()">Close</button>
                </div>
            </div>`;
        overlayItem.dataset.userID =
          e.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
        showCart();
        break;
      default:
        break;
    }
    editOverlay.style.display = "block";
  }
});
editOverlay.addEventListener("click", (e) => {
  // console.log(editOverlay.style.display);
  // console.log(e.target)
  if (e.target.id === "editOverlay") editOverlay.style.display = "none";
});
