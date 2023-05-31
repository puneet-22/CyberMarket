const LoginasUserBtn = document.getElementById("userLogin");
const LoginasAdminBtn = document.getElementById("adminLogin");
const RegisterNewBtn = document.getElementById("userRegister");


// url for register user ===> http://localhost:5000/users/registerUser
const registerFunc = async (e) => {
  e.preventDefault();
  const userName = document.querySelector("#name").value;
  const userEmail = document.querySelector("#email").value;
  const userPasword = document.querySelector("#password").value;
  const loginForm = document.querySelector("form.loginForm");
  console.log("login form: ",loginForm);
  try {
    await fetch("http://localhost:5000/users/registerUser", {
      method: "POST",
      body: JSON.stringify({
        Name: userName,
        Email: userEmail,
        Password: userPasword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        if (response.msg === "Email Already exists") {
          alert("Email already exists.....try log in");
        }
        if (response.msg === "User Registered") {
          const name = response.info.Name;
          const email = response.info.Email;

          alert(`${name} is registered Successfully with EmailID: ${email}
          You can now Log In`);
          location.href="userLogin.html"
        }
        if (response.msg === '"Name" length must be at least 6 characters long'){
          alert(response.msg);
        } 
      });
      console.log("hello");
  } catch (err) {
    console.log(err);
  }

  // .then((response) => console.log(JSON.stringify(response)));
  //   console.log(userEmail, userPasword);
  //   console.log(loginForm)
  loginForm.reset();
};
const loginAdminFunc = (e) => {};
const loginUserFunc = async (e) => {
  e.preventDefault();
  const userEmail = document.querySelector("#email").value;
  const userPasword = document.querySelector("#password").value;
  try {
    await fetch("http://localhost:5000/users/loginUser", {
      method: "POST",
      body: JSON.stringify({
        
        Email: userEmail,
        Password: userPasword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        // console.log("headers: ",response.jwt)
        return response.json()})
      .then((response) => {
        // console.log("Token: ", response.jwt)
        if (response.msg === "Invalid Password") {
          alert("Invalid Password !!!!!!!");
        }
        if (response.msg === "logged in") {
          
          const email = response.verifiedEmail;
        localStorage.setItem('jwt',response.jwt);
          alert(`You are now logged in as ${email}`);
          location.href="userDashboard.html"
        }
      });
  } catch (err) {
    console.log(err);
  }
  //   console.log(userEmail, userPasword);
  //   console.log("Login user button is clicked");
//   const cookieData= document.cookie;
//           console.log(cookieData);
// loginForm.reset();
};

if (RegisterNewBtn) RegisterNewBtn.addEventListener("click", registerFunc);
if (LoginasAdminBtn) LoginasAdminBtn.addEventListener("click", loginAdminFunc);
if (LoginasUserBtn) LoginasUserBtn.addEventListener("click", loginUserFunc);
console.log(LoginasUserBtn);
console.log(LoginasAdminBtn);
console.log(RegisterNewBtn);
