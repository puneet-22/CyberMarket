const contentBody = document.querySelector('.pageContent');
const productsButton = document.querySelector('#getAllProducts');



const tableHeaders= `<table class="table">
<thead class="thead-dark">
  <tr>
    
    <th scope="col">Product</th>
    <th scope="col">Description</th>
    <th scope="col">Seller</th>
    <th scope="col">Price</th>
    <th scope="col">Tags</th>
    <th scope="col">Actions</th>
  </tr>
</thead>
<tbody>`;

const tableLast=`  </tbody>
</table>`;
// const tableRow=` <tr id="${product._id}">
// <th scope="row">3</th>
// <td>Larry</td>
// <td>the Bird</td>
// <td>@twitter</td>
// </tr>`
const getAllProducts=async ()=>{
    console.log("this is working");
    try {
        await fetch("http://localhost:5000/products/getAll", {
          method: "GET",
          
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "auth-token": jwt,
          },
        })
        .then((response) => {
            
            return response.json()})
          .then((response) => {
            products=response;
            const productsTable = products.map((product)=>{
                return `<tr id="${product._id}" >
                <th scope='row'>${product.ProductName}</th>
                <td>${product.ProductDescription}</td>
                <td>${product.Seller}</td>
                <td>${product.Price} ₹</td>
                <td>${product.Tags}</td>
                <td class="productOptions"><button class="orderButton">Order</button><button class="addToCart">Add to cart</button><button class="addToWishlist">Add to Wishlist</button></td>
              </tr>`
            })

            const productsTableString= productsTable.toString().split(",").join(" ");
            contentBody.innerHTML=tableHeaders+productsTableString+tableLast;
            
          });
      } catch (err) {
        console.log(err);
      }
      
}

productsButton.addEventListener('click', getAllProducts);
