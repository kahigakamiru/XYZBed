let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Cain King Bed',
        tag: 'cain',
        price: 199995.00,
        inCart: 0
    },
    {
        name: 'Lamu King',
        tag: 'lamu',
        price: 199995.00,
        inCart: 0
    },
    {
        name: 'Paloma King Bed',
        tag: 'paloma',
        price: 229995.00,
        inCart: 0
    },
    {
        name: 'Nior King Bed',
        tag: 'nior',
        price: 249995.00,
        inCart: 0
    },
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
       cartNumbers(products[i]);
       totalCost(products[i])

    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) { 
    let productNumbers = localStorage.getItem('cartNumbers');
    //changing productNumber from string to number
    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    } 

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); 

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product 
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
         }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
//   console.log("The product price is", product.price);
  let cartCost = localStorage.getItem('totalCost');
 
  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);
  if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
  
}
//function to display
function displayCart () {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    
    console.log(cartItems);
   
    let GrandTotal = 0;
    
    if( cartItems && productContainer ) {
        // productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            let totalCost = 0;
            //calculating the discounts
            if (item.inCart >= 10){
                totalCost = (item.inCart * item.price * 0.1);
            }
            if (item.inCart >= 25) {
                totalCost = (item.inCart * item.price * 0.25);
            }
            if (item.inCart >= 50) {
                totalCost = (item.inCart * item.price * 0.50);
            }

            if(item.inCart<10){
                totalCost = (item.inCart * item.price)
            }
            GrandTotal += totalCost;
            document.querySelector(".GrandTotal").innerText = GrandTotal;
            productContainer.innerHTML +=`<div class="products">
            <div>${item.tag}</div>
            <div>${item.price}</div>
            <div>${item.inCart}</div>
            <div>$${totalCost},00</div>
            </div>`
            // productContainer.innerHTML += `
            // <div class="product">
            //   <i class="fas fa-times-circle"></i>
            //   <img src="./images/${item.tag}.jpeg">
            //   <span>$${item.name}</span>
            // </div>
            // <div class="price">${item.price}</div>
            // <div class="quantity">
            // <i class="fas fa-decrease"></i>
            // <span>${item.inCart}</span>
            // <i class="fas fa-increase"></i>
            // </div>
            // <div class="total">
            //        $${totalCost},00
            // </div>
            // `
           
        });
    }
}

onLoadCartNumbers();

displayCart();