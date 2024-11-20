//initial to add the items in cart-->empty array.
let cart = [];
let productNewQty = 0;

function removeItem(event) {
    let itemIndex = event.target.getAttribute('data-index');
     cart.splice(itemIndex, 1);
    updateCart();  
}

function updateCart() {
  let cartItemsList = document.getElementById("cart-items");
  let cartcount = document.getElementById("cart-count");
  let totalPrice = document.getElementById("total-price");

  cartItemsList.innerHTML = "";
  cartcount.textContent = cart.length;
  //calc the totalamt-->0
  let totalamt = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let listItem = document.createElement("li");
    listItem.innerHTML = `<img src="${item.image}" style="width:45px;"/> 
        <button class="remove-item" data-index="${i}">Delete</button>`;
    // listItem.querySelector('.item-qty').addEventListener('change', updateQuantity);
    listItem
      .querySelector(".remove-item")
      .addEventListener("click", removeItem);
    cartItemsList.appendChild(listItem);
    totalamt+=item.price;
  }
  totalPrice.textContent = totalamt.toFixed(2);
}


function addToCart(event) {
  console.log(event.target.previousElementSibling.value);
  let productName = event.target.getAttribute("data-name");
  let productPrice = parseInt(event.target.getAttribute("data-price"));
  let productImage = event.target.getAttribute("data-image");
  let exitingItem = cart.find((item) => item.name === productName);
  let productQty = parseInt(event.target.previousElementSibling.value);
  let productFinalPrice = productPrice * productQty;
  console.log(productFinalPrice);
  if(exitingItem){
      exitingItem.quantity++;
  }else{
      cart.push({ name: productName, price: productFinalPrice,image:productImage});
  }
  updateCart();
}

const APIUrl = "https://fakestoreapi.com/products/";

function loadProduct() {
  fetch(APIUrl)
    .then((response) => response.json())
    .then((data) => {
      const shopContent = document.getElementById("shop-content");
      let productQty = 0;
      data.forEach((product) => {
        const productitem = `
                    <div class="product-box">
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product-title">
                            <h5>${product.title}</h5>
                            <p>₹${product.price.toFixed(2)}</p>
                            <input type="number" class="item-qty" value="${productQty}"  data-index="1" min="1" />
        
                           <button class="add-cart" 
                                data-name="${product.title}" 
                                data-price="${product.price}" 
                                data-image="${
                                  product.image
                                }">Add to Cart</button>
                        </div>
                    </div>`;
        shopContent.innerHTML += productitem;
      });

      // Attach event listeners to Add to Cart buttons
      const addToCartButtons = document.querySelectorAll(".add-cart");
    //   const productQtyObject = document.querySelectorAll(".item-qty");

    //   productQtyObject.forEach((input) => {
    //     console.log(productQtyObject);
    //     let productQty = input.value;
    //     console.log(productQty);
    //   });
  
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
        
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}
// Load products on page load
document.addEventListener("DOMContentLoaded", loadProduct);
