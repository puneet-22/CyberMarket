const backToUserdashboard = document.querySelector("#userDashboard");
const allUsers = document.querySelector("#getAllUsers");
const products = document.querySelector("#getAllProductsAdmin");
const promoteToAdmin = document.querySelector("#promote");
const shoppingCart = document.querySelector("#shoppingCartAdmin");
const navbar = document.querySelector("nav.navbar");
const contentBody = document.querySelector("div.pageContent");
const addProductButton = document.querySelector("li#addProduct");
const jwt = localStorage.getItem("jwt");
console.log("my token : ", jwt);
const backToUser = () => {
  location.href = "userDashboard.html";
};

{
  /*        */
}
{
  /* <td class="${user.isAdmin ? "admin": "notAdmin" }">${user.isAdmin ? "✅": "❌" }</td>
            <td>${user.createdAt}</td>
            <td><button   >Edit</button></td>
            <td><button  >Delete</button></td>
            <td><button  >Promote</button></td>
            <td><button class='viewCart>View Cart</button></td> */
}
const getAllUsers = async () => {
  await fetch("http://localhost:5000/admin/getAllUsers", {
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
      users = response.data;
      console.log(users);
      const usersTable = users?.map((user) => {
        return `<tr id="${user._id}">
            <td class='username'>${user.Name}</td>
            <td class='email'>${user.Email}</td>
            <td>${user._id}</td>
            <td class="${user.isAdmin ? "admin" : "notAdmin"}">${
          user.isAdmin ? "✅" : "❌"
        }</td>
            <td>${user.createdAt.split("T")[0]}</td>
            <td><button class=  ${
              user.isAdmin ? "notAllowed" : "allowed"
            }  >Edit</button></td>
            <td><button class=${
              user.isAdmin ? "notAllowed" : "allowed"
            } >Delete</button></td>
            <td><button class=${
              user.isAdmin ? "notAllowed" : "allowed"
            } >Promote</button></td>
            <td><button class=${
              user.isAdmin ? "notAllowed" : "allowed"
            }>cart</button></td>
          </tr>`;
      });
      const Headers =
        "<table><tr>    <th>Name</th>    <th>Email</th> <th>ID</th> <th>isAdmin</th>  <th>Date of creation</th> <th>Edit User</th>    <th>Delete User</th> <th>Promote to Admin</th>  <th>View User's Cart</th> </tr>";
      const tableLast = `</table>`;
      contentBody.innerHTML =
        Headers + usersTable.toString().split(",").join("") + tableLast;
    });
};
const getAllProductsAdmin = async () => {
  const tableHeaders =
    "<table table table-hover> <thead> <tr >    <th scope='col' >Product Name</th>    <th>Description</th>    <th>Seller</th>    <th>Price</th>    <th>Tags</th>    <th>Edit</th> <th>Delete </th></tr><thead>";
  const tableLast = `</table>`;

  try {
    await fetch("http://localhost:5000/products/getAll", {
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
        const products = response;
        const productsTable = products.map((product) => {
          return `<tr id="${product._id}">
                    <td>${product.ProductName}</td>
                    <td>${product.ProductDescription}</td>
                    <td>${product.Seller}</td>
                    <td>${product.Price} ₹</td>
                    <td>${product.Tags}</td>
                    <td class="productOptions"><button class="editProduct">Edit</button></td>
                    <td class="productOptions"><button class="deleteProduct">Delete</button></td>
                  </tr>`;
        });

        contentBody.innerHTML =
          tableHeaders + productsTable.toString().split(",").join("");
        +tableLast;
      });
  } catch (err) {
    console.log(err);
  }
};

const getShoppingcarts = async () => {};
const navbarFunction = (e) => {
  const buttonPressed = e.target.parentNode.id;

  switch (buttonPressed) {
    case "userDashboard":
      backToUser();
      break;
    case "getAllUsers":
      getAllUsers();
      break;
    case "getAllProductsAdmin":
      getAllProductsAdmin();
      break;
    case "promote":
      promote();
      break;
    case "shoppingCartAdmin":
      getShoppingcarts();
      break;
    default:
      break;
  }
};

navbar.addEventListener("click", navbarFunction);

const addProductForm = `<div class="addNewProduct">
<form class="addProduct">
    <div class="flexItem">
      <label for="product-name">Product Name:</label>
      <input type="text" id="newProdName" name="product-name" /><br />
    </div>
  
    <div class="flexItem">
      <label for="description">Description:</label>
      <input type="text" id="newDescription" name="description" /><br />
    </div>
  
    <div class="flexItem">
      <label for="seller">Seller:</label>
      <input type="text" id="newSeller" name="seller" /><br />
    </div>
  
    <div class="flexItem">
      <label for="price">Price:</label>
      <input type="number" id="newPrice" name="price" step="0.01" min="0" /><br />
    </div>
    <div class="flexItem">
        <label for="tags">Tags:</label>
        <input type="text" id="newTags" name="tags" /><br />
      </div>
   <button class="confirmAddProduct">Add Product</button>
  </form>
  
</div>`;

addProductButton.addEventListener("click", (e) => {
  contentBody.innerHTML = addProductForm;
});
