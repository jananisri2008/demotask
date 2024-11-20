//initial to add the items in cart-->empty array.
let cart = [];

/*updatecart function 
1)cartItemsList-->cart item display
2)cartcount-->number of items display
3)totalprice-->display total price
4)innerhtml''-->clear the item
5)textcontent-->display update the count of the item
*/

function updateCart() {
    let cartItemsList = document.getElementById('cart-items');
    let cartcount = document.getElementById('cart-count');
    let totalPrice=document.getElementById('total-price'); 
   
    cartItemsList.innerHTML = ''; 

    if (!cart || cart.length === 0) {
        cartcount.textContent = 0;
        totalPrice.textContent = "₹0.00";
        cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
        return;
    } 

    cartcount.textContent = cart.length;  
    //calc the totalamt-->0 
      let totalamt = 0;
    
    /*display the products in the cart
     1)cart[i]-->current item
     2)createElement-->create a new element for items.
     3)innerhtml'name','price','qty'
     4)input type-->choose the qty
     5)button-->delete the item in the cart 
     6)update the qty while user click the qty + -
     7)remove the item while user click the delete btn 
     8)appendchild-->add the new items 
     9)calculate the price and qty
     10)display the total amt*/
     for (let i = 0; i < cart.length; i++) {

        let item = cart[i] || { image: "", name: "Unknown", price: 0, qty: 1 }; // Default values
        let qty = parseInt(item.qty, 10) || 1; // Ensure valid quantity
        let price = parseFloat(item.price) || 0; 

        //let item = cart[i];
        let listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${item.image}" style="width:45px;"/>
        ${item.name} - ₹${item.price} - Qty: 
        <input type="number" class="item-qty" value="${qty}" data-index="${i}" min="1">
         <button class="remove-item" data-index="${i}">Delete</button>`;
            listItem.querySelector('.item-qty').addEventListener('change', updateQuantity);
            listItem.querySelector('.remove-item').addEventListener('click', removeItem);
        cartItemsList.appendChild(listItem);
        totalamt+=price*qty;
    }
    totalPrice.textContent=totalamt;
}
//add to cart
/*1)productname-->get the name from the button clicked using event.target
  2)productprice-->get the price from the button clicked using event.target
  3)check the item is already present or not*/
function addToCart(event) {
    let productName = event.target.getAttribute('data-name');
    let productPrice = parseInt(event.target.getAttribute('data-price'));
   let productImage=event.target.getAttribute('data-image');
  let productQty=parseInt(event.target.getAttribute('item-qty'));
  // console.log(productQty);
    let exitingItem=cart.find(item=>item.name===productName);
    /*1)item present--> qty++
     2)item not present-->create new object
     3)call the updatecart function*/
    if(exitingItem){
        exitingItem.quantity++;
    }else{
        cart.push({ name: productName, price: productPrice,qty:productQty,image:productImage});
    }
    updateCart();
}
//update qty 
/* 1)itemIndex-->get the index item
2) new qty value
3) new qty>0--->item--- array*/
function updateQuantity(event) {
    let itemIndex = event.target.getAttribute('data-index');
    let newQty = parseInt(event.target.value);

    if (newQty > 0) {
        cart[itemIndex].qty = newQty;
    }
    updateCart();  
}
//remove item
/*1)itemIndex-->remove the item from the index
2)splice(item,1)--->remove the particular item from index */
function removeItem(event) {
    let itemIndex = event.target.getAttribute('data-index');
     cart.splice(itemIndex, 1);
    updateCart();  
}
//addtocart button
/*1)queryselectorall-->select all the data from the addtocart class
2)for loop-->add to cart for all the products while click the addtocart. */
let addToCartButtons = document.querySelectorAll('.add-cart');
for(let i=0;i<addToCartButtons.length;i++){
    addToCartButtons[i].addEventListener('click',addToCart);
}


const APIUrl = "https://fakestoreapi.com/products/";

/*function loadProduct() {
    // Fetch data from API
    fetch(APIUrl)
        .then(response => response.json())
        .then(data => {
            //the eshopping element exists
            const eshoppingContainer = document.getElementById('shop-content');
            if (!eshoppingContainer) {
                console.error("Error: #eshopping element not found in the DOM!");
                return;
            }
            // Loop through the fetched data and create elements dynamically
            data.forEach(product => {
                const cartitem = `
                    <div class="product">
                        <div class="images">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="productdetails">
                            <h5>${product.title}</h5>
                            <p>₹${product.price}</p>
                        </div>
                    </div>`;
                // Add the created HTML to the eshopping container
                eshoppingContainer.innerHTML += cartitem;
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}*/
function loadProduct() {
    fetch(APIUrl)
        .then(response => response.json())
        .then(data => {
            const shopContent = document.getElementById('shop-content');
            data.forEach(product => {
                const productitem = `
                    <div class="product-box">
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product-title">
                            <h5>${product.title}</h5>
                            <p>₹${product.price.toFixed(2)}</p>
                            
                           <button class="add-cart" 
                                data-name="${product.title}" 
                                data-price="${product.price}" 
                                data-image="${product.image}">Add to Cart</button>
                        </div>
                    </div>`;
                shopContent.innerHTML += productitem;
            });

            // Attach event listeners to Add to Cart buttons
            const addToCartButtons = document.querySelectorAll('.add-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
    }
// Load products on page load
document.addEventListener('DOMContentLoaded', loadProduct);


/*shipping code */
//  function checkout(){
//    // console.log("Checkout");
//     let fname=document.forms["sform"]["fname"].value;
//     let lname=document.forms["sform"]["lname"].value;
//     let address=document.forms["sform"]["add"].value;
//     let city=document.forms["sform"]["city"].value;
//     let state=document.forms["sform"]["state"].value;
//     let pincode=document.forms["sform"]["pincode"].value;
//     let phno=document.forms["sform"]["phno"].value;

//     let cno=document.forms["pform"]["cno"].value;
//     let cname=document.forms["pform"]["cname"].value;
//     let cv=document.forms["pform"]["cv"].value;
//     let edate=document.forms["pform"]["edate"].value;
    
//     if(fname=="" && lname=="" && address=="" && city=="" &&
//          state=="" && pincode=="" && phno=="" && cno=="" && 
//          cname=="" && cv=="" && edate==""){
//         alert("Data not fill in the Shipping and Payment");
    
//     }    
//     else if(fname=="" || lname=="" || address=="" || city=="" ||
//         state=="" || pincode=="" || phno=="" ){
//             alert("Data not fill in the Shipping");
            
//     }
//     else if(cno=="" || cname=="" || cv=="" || edate==""){
//         alert("Data not fill in the Payment");
        
//     }
//     else{
//         window.location.href = "order.html";
//     }
//      }
