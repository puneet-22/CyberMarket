const orderFunction=async(orderBtn)=>{
    if(!orderBtn.classList.contains('orderButton')) return        
    
    productID=orderBtn.parentElement.parentElement.id;  
    try {
        await fetch("http://localhost:5000/products/orderProduct", {
      method: "POST",
      body: JSON.stringify({
        
        productID: productID,
        orderAddress: "Jaipur , Raj",
        quantity: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": jwt
      },
    }).then((response) => {
        // console.log("headers: ",response.jwt)
        return response.json()})
        .then((res)=>{
            if(res.msg==='Order Placed...'){
                alert(`Your order is placed! Your order total is : ${res.order.OrderTotal}₹`)
            }
        })
    } catch (error) {
        
    }
}
    
const addToCartFunction = async(cartBtn)=>{
    
    if(!cartBtn.classList.contains('addToCart')) return     ;
    const productID=cartBtn.parentElement.parentElement.id;
    try {
        await fetch("http://localhost:5000/products/addToCart", {
      method: "POST",
      body: JSON.stringify({
        
        productID: productID,
        quantity: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": jwt
      },
    }).then((response) => {
        // console.log("headers: ",response.jwt)
        return response.json()})
        .then((res)=>{
            if(res.msg==='added to your shopping cart successfully'){
                alert(`Added to cart successfully!`);
            }
        })
    } catch (error) {
        
    }
    
}
const orderFromCart=async(orderButton)=>{
    // if(!orderButton.classList.contains('orderFromCart')) return ;
    // productID=orderButton.parentElement.parentElement.id;  
    // try {
    //     await fetch("http://localhost:5000/cart/orderProduct", {
    //   method: "POST",
    //   body: JSON.stringify({
        
    //     productID: productID,
    //     orderAddress: "Jaipur , Raj",
    //     quantity: 1
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     "auth-token": jwt
    //   },
    // }).then((response) => {
    //     // console.log("headers: ",response.jwt)
    //     return response.json()})
    //     .then((res)=>{
    //         if(res.msg==='Order Placed...'){
    //             alert(`Your order is placed! Your order total is : ${res.order.OrderTotal}₹`)
    //         }
    //     })
    // } catch (error) {
        
    // }
    // console.log("ordering from cart")
}
contentBody.addEventListener('click',(e)=>{
    console.log(e);
    orderFunction(e.target);
    addToCartFunction(e.target);
    orderFromCart(e.target);
    
})