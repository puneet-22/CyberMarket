const myOrdersButton = document.querySelector("#myOrdersBtn");

const ordertableHeaders = `<table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Product ID</th>
    <th scope="col">Quantity</th>
    <th scope="col">Price</th>
    <th scope="col">Order Total</th>
    <th scope="col">Address</th>
    <th scope="col">Status</th>
  </tr>
</thead>
<tbody>`;
const orderTableFooter = `</tbody>
</table>`;
const getAllOrders = async () => {
  try {
    await fetch("http://localhost:5000/users/getMyOrders", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": jwt,
      },
    })
      .then((response) => {
        // console.log("working")
        return response.json();
      })
      .then((res) => {
        orders = res.orders;
        console.log(orders);
        const orderTable = orders.map((order) => {
          return `<tr id="${order.ProductID}">
                <td>${order.ProductName}</td>
                <td>${order.ProductID}</td>
                <td>${order.Quantity}</td>
                <td>${order.PricePerUnit}</td>
                <td>${order.OrderTotal} ₹</td>
                <td>${order.Address}</td>
                <td>${order.Status}</td>
              </tr>`;
        });

        const orderTableString = orderTable.toString().split(",").join("");
        contentBody.innerHTML =
          ordertableHeaders + orderTableString + orderTableFooter;
      });
  } catch (err) {
    throw err;
  }
};

myOrdersButton.addEventListener("click", getAllOrders);
