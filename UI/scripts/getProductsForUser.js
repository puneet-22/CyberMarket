const contentBody = document.querySelector(".pageContent");
const productsButton = document.querySelector("#getAllProducts");

// ProductName
// "SmartPhone"
// ProductDescription
// "It is a phone"
// Price
// 999

// Tags
// Array
// Seller
// "puneetInfoTech"
// createdAt
// 2023-03-02T04:06:04.391+00:00
// updatedAt
// 2023-03-02T04:06:04.391+00:00

// const searchRow = `<tr>
// <td><input type="text" id="searchProductName" onkeyup="searchByProductName()" placeholder="Search..." title="Type in a name"> </td>
// <td></td>
// <td><input type="text" id="searchSeller" onkeyup="searchBySeller()" placeholder="Search..." title="Type in a name"> </td>
// <td></td>
// <td><input type="text" id="searchTags" onkeyup="searchByTags()" placeholder="Search..." title="Type in a name"> </td>
// <td></td>
// </tr>`
const tableHeaders = `<div class="input-group mb-3">
                          <input type="text" id="searchProductName" onkeyup="searchByProductName()" class="form-control" placeholder="Search products..." title="Type in a name">
                          <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button"><i class="fa fa-search"></i></button>
                          </div>
                        </div>
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Description</th>
                              <th>Seller</th>
                              <th>Price</th>
                              <th>Tags</th>
                              <th>Order</th>
                            </tr>
                          </thead>
                          <tbody>`;
const tableLast = `</tbody></table>`;

const getAllProducts = async () => {
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
        products = response;
        const productsTable = products.map((product) => {
          return `<tr id="${product._id}" class="productRow">
                    <td>${product.ProductName}</td>
                    <td>${product.ProductDescription}</td>
                    <td>${product.Seller}</td>
                    <td>${product.Price} ₹</td>
                    <td>${product.Tags}</td>
                    <td class="productOptions"><button class="btn btn-primary orderButton">Order</button><button class="btn btn-primary addToCart">Add to cart</button><button class="btn btn-primary  addToWishlist">Add to Wishlist</button></td>
                  </tr>`;
        });
        const productsTableString = productsTable
          .toString()
          .split(",")
          .join(" ");
        contentBody.innerHTML = tableHeaders + productsTableString + tableLast;
      });
  } catch (err) {
    console.log(err);
  }
};

productsButton.addEventListener("click", getAllProducts);
