// ================= LOGIN / SIGNUP =================

let isLogin = true;

let users = JSON.parse(localStorage.getItem("users")) || [];

function toggleForm(){

  isLogin = !isLogin;

  document.getElementById("formTitle").innerText =
  isLogin ? "EpicStream Login" : "EpicStream Signup";

  document.getElementById("authBtn").innerText =
  isLogin ? "Login" : "Signup";

  document.getElementById("toggleText").innerText =
  isLogin
  ? "Don't have account? Signup"
  : "Already have account? Login";
}

function handleAuth(){

  let username = document.getElementById("username").value;

  let password = document.getElementById("password").value;

  if(isLogin){

    let found = users.find(
      u => u.username === username &&
      u.password === password
    );

    if(found){

      localStorage.setItem(
        "currentUser",
        JSON.stringify(found)
      );

      showApp();

    }else{
      alert("Wrong Login ❌");
    }

  }else{

    users.push({
      username,
      password
    });

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Signup Successful ✅");

    toggleForm();
  }
}

// ================= SHOW APP =================

function showApp(){

  document.getElementById("authBox")
  .classList.add("hidden");

  document.getElementById("app")
  .classList.remove("hidden");

}

// ================= LOGOUT =================

function logout(){

  localStorage.removeItem("currentUser");

  location.reload();

}

// ================= PROFILE DP =================

let dpUpload =
document.getElementById("dpUpload");

dpUpload.addEventListener("change", function(){

  let file = this.files[0];

  let reader = new FileReader();

  reader.onload = function(){

    document.getElementById("dp").src =
    reader.result;

    localStorage.setItem(
      "profileDP",
      reader.result
    );
  }

  reader.readAsDataURL(file);

});

// ================= VIDEOS =================

let videos = [
  {
    title:"Home",
    img:"https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    id:"dQw4w9WgXcQ"
},
{
    title:"TV Shows",
    img:"https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
    id:"9bZkp7q19f0"
},
{
    title:"Movies",
    img:"https://i.ytimg.com/vi/EXeTwQWrcwY/hqdefault.jpg",
    id:"EXeTwQWrcwY"
},
{
    title:"New & Popular",
    img:"https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    id:"JGwWNGJdvx8"
},
{
    title:"My List",
    img:"https://i.ytimg.com/vi/kXYiU_JCYtU/hqdefault.jpg",
    id:"kXYiU_JCYtU"
},
{
    title:"Web-Series",
    img:"https://i.ytimg.com/vi/60ItHLz5WEA/hqdefault.jpg",
    id:"60ItHLz5WEA"
},
{
    title:"Sports",
    img:"https://i.ytimg.com/vi/fLexgOxsZu0/hqdefault.jpg",
    id:"fLexgOxsZu0"
},
{
    title:"Hollywood Movies",
    img:"https://i.ytimg.com/vi/e-ORhEE9VVg/hqdefault.jpg",
    id:"e-ORhEE9VVg"
},
{
    title:"Korean Shows",
    img:"https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg",
    id:"OPf0YbXqDm0"
},
{
    title:"Animation Movies Shows",
    img:"https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg",
    id:"CevxZvSJLk8"
},
{
    title:"Anime Fight",
    img:"https://i.ytimg.com/vi/1roy4o4tqQM/hqdefault.jpg",
    id:"1roy4o4tqQM"
  },
];

// ================= RENDER VIDEOS =================

function renderVideos(data){

  let container =
  document.getElementById("videoContainer");

  container.innerHTML = "";

  data.forEach(video => {

    container.innerHTML += `
    
    <div class="card">

      <img src="${video.img}">

      <h4>${video.title}</h4>

      <button onclick="watchVideo('${video.id}')">
        ▶ Watch
      </button>

      <button onclick="addToList(
        '${video.title}',
        '${video.img}',
        '${video.id}'
      )">
        ❤️ My List
      </button>

    </div>
    `;
  });
}

// ================= WATCH VIDEO =================

function watchVideo(id){

  window.open(
    `https://www.youtube.com/watch?v=${id}`,
    "_blank"
  );

}

// ================= MY LIST =================

let myList =
JSON.parse(localStorage.getItem("myList")) || [];

function addToList(title,img,id){

  myList.push({
    title,
    img,
    id
  });

  localStorage.setItem(
    "myList",
    JSON.stringify(myList)
  );

  showMyList();

}

function showMyList(){

  let box =
  document.getElementById("myList");

  box.innerHTML = "";

  myList.forEach(video => {

    box.innerHTML += `
    
    <div class="card">

      <img src="${video.img}">

      <h4>${video.title}</h4>

    </div>
    `;
  });
}

// ================= SEARCH =================

document.getElementById("search")
.addEventListener("input",(e)=>{

  let value =
  e.target.value.toLowerCase();

  let filtered = videos.filter(video =>

    video.title.toLowerCase()
    .includes(value)

  );

  renderVideos(filtered);

});

// ================= FILTER =================

function filterVideos(category){

  let filtered = videos.filter(video =>

    video.title.toLowerCase()
    .includes(category)

  );

  renderVideos(filtered);

}

// ================= ADMIN PANEL =================

function addVideo(){

  let title =
  document.getElementById("adminTitle").value;

  let img =
  document.getElementById("adminImg").value;

  let id =
  document.getElementById("adminVideo").value;

  videos.push({
    title,
    img,
    id
  });

  renderVideos(videos);

  alert("Video Added ✅");

}

// ================= LOAD =================

window.onload = () => {

  let currentUser =
  localStorage.getItem("currentUser");

  if(currentUser){
    showApp();
  }

  let savedDP =
  localStorage.getItem("profileDP");

  if(savedDP){
    document.getElementById("dp").src =
    savedDP;
  }

  renderVideos(videos);

  showMyList();

};