const loggedInInfo = document.querySelector("div.loggedIn");
const setAdmin = document.querySelector("#adminOptions");

console.log(setAdmin);
const jwt = localStorage.getItem("jwt");

const setLoggedIn = async () => {
  try {
    await fetch("http://localhost:5000/users/getUserDetails", {
      method: "GET",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "auth-token": jwt,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.msg === "user does not exist") {
          alert("user does not exist !!!!!!!");
        } else {
          const user = response.user;
          loggedInInfo.innerHTML = `Hi <span class="userName"> ${user.Name}</span> !! <span class="logout btn btn-primary">logout?</span>`;
          if (user.isAdmin) {
            setAdmin.innerHTML = `<button type="button" class="proceedToAdmin btn btn-outline-primary">Admin Dashboard</button>`;
          }

          console.log(user);
          // localStorage.setItem('jwt',response.jwt);
          //   alert(`You are now logged in as ${email}`);
          //   location.href="userDashboard.html"
        }
      });
  } catch (err) {
    console.log(err);
  }
};
const isUserVerified = () => {
  return localStorage.getItem("jwt") ? true : false;
};
const isUnauthorized = () => {
  if (!isUserVerified()) {
    alert("You Don't have access to this page");
    location.href = "userLogin.html";
  } else {
    console.log("you are verified");
  }
};
const goToAdmin = (e) => {
  location.href = "adminDashboard.html";
};
setAdmin.addEventListener("click", goToAdmin);
const logOut = () => {
  console.log("clicking button");
  localStorage.removeItem("jwt");
  location.href = "userLogin.html";
};

isUnauthorized();
setLoggedIn();
setTimeout(() => {
  console.log("in Timeout");
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", logOut);
}, 300);
