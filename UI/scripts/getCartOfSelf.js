const showCartBtn = document.querySelector("#shoppingCartBtn");
const cartTableHeaders = `<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Product Name</th>
      <th scope="col">ProductID</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Order</th>
    </tr>
  </thead>
  <tbody>`;

const getCartFunc = async () => {
  try {
    await fetch("http://localhost:5000/users/showSelfCart", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": jwt,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        cart = res.cart[0].products;
        console.log(cart);
        const cartTable = cart.map((order) => {
          return `<tr id="${order.productID}">
            <td>${order.productName}</td>
            <td>${order.productID}</td>
            <td>${order.quantity ? order.quantity : 1}</td>
            <td>${order.price}</td>
            <td><button class="btn btn-primary orderFromCart">Order Product</button></td>
          </tr>`;
        });

        contentBody.innerHTML =
          cartTableHeaders + cartTable.join("") + "</tbody></table>";
      });
  } catch (err) {
    throw err;
  }
};

showCartBtn.addEventListener("click", getCartFunc);
