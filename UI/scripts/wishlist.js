const wishlistBtn = document.querySelector("#wishlistBtn");
let addToCartButton;
const showWishlist = async () => {
  await fetch("http://localhost:5000/users/showSelfWishlist", {
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
      const products = res.wishlist[0].products;
      const wishlistDOM = products.map((x) => {
        return `<div class="card wishlistItem mb-3">
              <div class="card-body">
                  <h5 class="card-title productName">${x.productName}</h5>
                  <p class="card-text productID">ID: ${x.productID}</p>
                  <h6 class="card-text price">Price: ${x.price} ₹</h6>
              </div>
              <div class="card-footer">
                  <button type="button" class="btn btn-outline-success addToCartFromWishList">Add To Cart</button>
              </div>
          </div>`;
      });

      contentBody.innerHTML =
        `<div class="wishlist container">` + wishlistDOM.join("") + `</div>`;
      addToCartButton = document.querySelectorAll(".addToCartFromWishList");
    });
};

const addProductToWishlist = async (e) => {
  if (e.target.innerHTML !== "Add to Wishlist") {
    return;
  }
  const productName =
    e.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
  const productID = e.target.parentNode.parentNode.id;
  const priceString =
    e.target.parentNode.previousSibling.previousSibling.previousSibling
      .previousSibling.innerHTML;
  const price = priceString.split(" ")[0];
  // console.log(productName);
  // console.log(productID);
  // console.log(parseInt(price));
  await fetch("http://localhost:5000/products/addProductToWishList", {
    method: "POST",
    body: JSON.stringify({
      productName: productName,
      productID: productID,
      price: price,
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
      alert("Added to cart");
    });
};

wishlistBtn.addEventListener("click", showWishlist);
contentBody.addEventListener("click", addProductToWishlist);
