
if (
    !window.location.pathname.includes("login.html") &&
    !window.location.pathname.includes("register.html")
) {

    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "login.html";
    }

}

function login(){

localStorage.setItem(
"isLoggedIn",
"true"
);

window.location.href="index.html";

}

function logout(){

localStorage.removeItem(
"isLoggedIn"
);

window.location.href=
"login.html";

}

const user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("user-info").innerHTML = `
👤 Welcome, ${user.name}
`;

}

const products = [
{
id:1,
name:"Elegant Kurti",
price:999,
category:"Kurti",
image:"https://www.royalexport.in/product-img/royal-maroon-kurti-suit-set-wi-1744097642.jpg"
},
{
id:2,
name:"Designer Saree",
price:1999,
category:"Saree",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiJZItSvnXC-zfKutxBVRf1cjb9tHJ8Zolmw&s"
},
{
id:3,
name:"Casual Dress",
price:1499,
category:"Dress",
image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDGLkJMxXdobZWsFldlb3oly6iAo5jdGc74w&s"
},
{
id:4,
name:"Fashion Handbag",
price:899,
category:"Bag",
image:"https://image.made-in-china.com/202f0j00WKnbeElFkokI/Luxury-Handbags-Women-Bags-Designer-Shoulder-Bag-High-Quality-Soft-Leather-Purses-and-Handbags-3-Layer-Large-Capacity-Tote-Bag.webp"
},
{
id:5,
name:"Party Gown",
price:2499,
category:"Dress",
image:"https://cdn-webdata.seasonsindia.com/assets/images/gowns-img.jpg"
},
{
id:6,
name:"Silk Saree",
price:2999,
category:"Saree",
image:"https://mangaldeep.co.in/cdn/shop/files/465-1.jpg?v=1756538420"
},
{
id:7,
name:"jeans",
price:999,
category:"Dress",
image:"https://lazostore.in/cdn/shop/files/IMG_4504_d1033ba9-b984-47a6-8420-d1c640f504dd.jpg?v=1752496002"
},
{
id:8,
name:"Stylish top",
price:899,
category:"Dress",
image:"https://img.ltwebstatic.com/v4/j/pi/2026/04/22/7d/1776821391f82a5050dbd856f98908ffa3dff0567d_thumbnail_405x552.jpg"
},
{
id:9,
name:"designer blouse",
price:2049,
category:"Saree",
image:"https://www.weddingplz.com/blog/wp-content/uploads/rocpy-685x400.jpg"
},
{
id:10,
name:"designer blouse",
price:1500,
category:"Saree",
image:"https://www.anantexports.in/cdn/shop/files/IMG-20231105-WA0011.jpg"
},
{
id:11,
name:"designer saree",
price:4980,
category:"Saree",
image:"https://static.cilory.com/810458-thickbox_default/purple-crepe-satin-silk-designer-saree.jpg"
},
{
id:12,
name:"top",
price:799,
category:"Dress",
image:"https://i.pinimg.com/736x/f0/f7/97/f0f797cbd206a92cd49a7edb4458f22d.jpg"
},
{
id:13,
name:"jeans",
price:1890,
category:"Dress",
image:"https://tanusreeboutique.com/wp-content/uploads/2024/11/67-6.jpg"
},
{
id:14,
name:"top",
price:2498,
category:"Dress",
image:"https://peppermint.in/cdn/shop/files/SS25-19328-Purple-G-M-1F1_2160x.jpg?v=1744718239"
},
{
id:15,
name:"bottoms",
price:1780,
category:"Dress",
image:"https://cpimg.tistatic.com/11946808/b/4/yellow-premium-cotton-blend-printed-jeans-top-for-girls.webp"
},

];

let cart=[];

function toggleProfile(){

const user =
JSON.parse(localStorage.getItem("user"));

document.getElementById("profile-name").innerText =
"Name: " + user.name;

document.getElementById("profile-email").innerText =
"Email: " + user.email;

document.getElementById("profile").classList.toggle("hidden");
}

function displayProducts(list){
const container=document.getElementById("products");

container.innerHTML="";

list.forEach(product=>{

container.innerHTML+=`
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<button onclick="addToCart(${product.id})">
Add To Cart
</button>
</div>
`;

});
}

function addToCart(id){

const product=
products.find(p=>p.id===id);

cart.push(product);

updateCart();

alert(product.name + " added to cart 🛍️");
}

function updateCart(){

const cartItems =
document.getElementById("cart-items");

cartItems.innerHTML="";

let total=0;

if(cart.length===0){

cartItems.innerHTML=`
<h3>Your Cart is Empty 🛒</h3>
<p>Add some stylish products.</p>
`;

document.getElementById("total").textContent=0;

return;
}

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-info">
<h4>${item.name}</h4>
<p>₹${item.price}</p>
</div>

<button
class="remove-btn"
onclick="removeItem(${index})">
✕
</button>

</div>
`;

});

cartItems.innerHTML += `
<hr>
<h3>Total: ₹${total}</h3>

<button 
class="checkout-btn"
onclick="goToCheckout()">
Proceed to Checkout
</button>
`;

document.getElementById("cart-count").textContent =
cart.length;

localStorage.setItem(
"cartTotal",
total
);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function goToCheckout(){

if(cart.length===0){
alert("Your cart is empty!");
return;
}

window.location.href =
"checkout.html";

}

function toggleDarkMode(){

document.body.classList.toggle("dark");
}



function toggleCart(){

document.getElementById("cart").classList.toggle("hidden");
}



document.getElementById("products").innerHTML = `
<h2 style="text-align:center; width:100%;">
Choose a category above to explore products 👗
</h2>
`;

function placeOrder(){

const name = document.getElementById("name").value.trim();
const phone = document.getElementById("phone").value.trim();
const email = document.getElementById("email").value.trim();
const address = document.getElementById("address").value.trim();

if(name === ""){
    alert("Please enter your name");
    return;
}

if(!/^[A-Za-z ]+$/.test(name)){
    alert("Name should contain only letters");
    return;
}

if(!/^[0-9]{10}$/.test(phone)){
    alert("Phone number must contain exactly 10 digits");
    return;
}

if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
    alert("Please enter a valid email address");
    return;
}

if(address.length < 10){
    alert("Please enter a complete address");
    return;
}

alert("🎉 Order placed successfully!");

localStorage.removeItem("cartTotal");

window.location.href = "index.html";
}

function filterProducts(category){


if(category === "All"){
    displayProducts(products);
	return;
    
}

const filtered = products.filter(
    product => product.category === category
);

displayProducts(filtered);

}

document.getElementById("search")
.addEventListener("input", (e) => {

const value = e.target.value.toLowerCase();

if(value === ""){

document.getElementById("products").innerHTML = `
<h2 style="text-align:center; width:100%;">
Choose a category above to explore products 👗
</h2>
`;

return;
}

const filtered = products.filter(product =>
product.name.toLowerCase().includes(value)
);

displayProducts(filtered);

});

