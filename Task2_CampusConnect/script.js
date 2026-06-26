

if(
!window.location.pathname.includes("login.html") &&
!window.location.pathname.includes("register.html")
){

if(localStorage.getItem("isLoggedIn") !== "true"){

window.location.href = "login.html";

}

}

function register(){

const name =
document.getElementById("name").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

// Name Validation
if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only letters.");
    return;
}

// Email Validation
const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

// Strong Password Validation
const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordPattern.test(password)) {

alert(
`Password must contain:

• Minimum 8 characters
• One uppercase letter
• One lowercase letter
• One number
• One special character`
);

return;
}

if(password!==confirmPassword){
alert("Passwords do not match");
return;
}

const user={
name,
email,
password
};

localStorage.setItem(
"user",
JSON.stringify(user)
);

alert("Registration Successful!");

window.location.href="login.html";
}

function login(){

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const user =
JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please register first");
return;
}

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){
alert("Enter a valid email.");
return;
}

if(password===""){
alert("Enter password.");
return;
}

if(
email === user.email &&
password === user.password
){

localStorage.setItem(
"isLoggedIn",
"true"
);

window.location.href =
"index.html";

}
else{

alert("Invalid Email or Password");

}
}

if(localStorage.getItem("isLoggedIn")==="true"){

const user =
JSON.parse(localStorage.getItem("user"));

if(
document.getElementById("userName")
){
document.getElementById("userName")
.innerText =
"👤 " + user.name;
}

loadPosts();

}

function logout(){

localStorage.removeItem(
"isLoggedIn"
);

window.location.href =
"login.html";

}

function addPost(){

const text =
document.getElementById("postText").value;

const category =
document.getElementById("category").value;
if(text===""){
alert("Write something first!");
return;
}

let posts =
JSON.parse(
localStorage.getItem("posts")
) || [];

const file =
document.getElementById("mediaFile").files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

posts.unshift({
user: JSON.parse(localStorage.getItem("user")).name,
text: text,
category: category,
time: new Date().toLocaleString(),
media: e.target.result,
mediaType: file.type
});

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

loadPosts();
};

reader.readAsDataURL(file);

return;
}

posts.unshift({
user: JSON.parse(localStorage.getItem("user")).name,
text: text,
category: category,
time: new Date().toLocaleString()
});



localStorage.setItem(
"posts",
JSON.stringify(posts)
);

document.getElementById("postText").value="";

loadPosts();
}

function loadPosts(){



const container =
document.getElementById("postsContainer");

if(!container) return;

const posts =
JSON.parse(
localStorage.getItem("posts")
) || [];

container.innerHTML="";

posts.forEach((post,index)=>{

container.innerHTML += `
<div class="post">

<h3>${post.user}</h3>
<h4>${post.category}</h4>
<p><small>${post.time || ""}</small></p>

${post.media ?
(
post.mediaType.startsWith("image")
?
`<img src="${post.media}" class="post-media">`
:
`<video controls class="post-media">
<source src="${post.media}">
</video>`
)
: ""
}


<p>${post.text}</p>

<button onclick="likePost(${index})">
❤️ ${post.likes || 0}
</button>



<button onclick="deletePost(${index})">
🗑️ Delete
</button>

<hr>

<input
type="text"
id="comment-${index}"
placeholder="Write a comment...">

<button onclick="addComment(${index})">
💬 Comment
</button>

<div class="comments">

${(post.comments || []).map(comment =>
`<p>💬 ${comment}</p>`
).join("")}

</div>

</div>
`;

});

}

function likePost(index){

let posts =
JSON.parse(localStorage.getItem("posts")) || [];

posts[index].likes =
(posts[index].likes || 0) + 1;

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

loadPosts();

}

function addComment(index){

const commentInput =
document.getElementById(
`comment-${index}`
);

const comment =
commentInput.value.trim();

if(comment === ""){
alert("Enter a comment");
return;
}

let posts =
JSON.parse(
localStorage.getItem("posts")
) || [];

if(!posts[index].comments){
posts[index].comments = [];
}

posts[index].comments.push(comment);

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

loadPosts();

}

function deletePost(index){

if(!confirm("Delete this post?")){
return;
}

let posts =
JSON.parse(localStorage.getItem("posts")) || [];

posts.splice(index,1);

localStorage.setItem(
"posts",
JSON.stringify(posts)
);

loadPosts();

}

function loadProfile(){

if(!document.getElementById("profile-name"))
return;

const user =
JSON.parse(localStorage.getItem("user"));

const posts =
JSON.parse(localStorage.getItem("posts"))
|| [];

let totalLikes = 0;

posts.forEach(post=>{
totalLikes += post.likes || 0;
});

document.getElementById("profile-name")
.innerText =
"Name: " + user.name;

document.getElementById("profile-email")
.innerText =
"Email: " + user.email;

document.getElementById("total-posts")
.innerText =
"Posts: " + posts.length;

document.getElementById("total-likes")
.innerText =
"Likes Received: " + totalLikes;
}

loadProfile();

function toggleDarkMode(){
document.body.classList.toggle("dark");
}


function togglePassword(id, icon){

const input = document.getElementById(id);

if(input.type==="password"){

input.type="text";

icon.innerHTML="🙈";

}
else{

input.type="password";

icon.innerHTML="👁";

}

}
