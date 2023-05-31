const editSelfButton = document.querySelector("#editSelf");

const updateSelfForm = `<div class="selfUpdateForm d-flex justify-content-around align-self-center">
<form id="selfEdit" class="form-group">
  <label for="newName" class="form-label">Updated Name:</label>
  <input type="text" id="newName" name="newName" class="form-control"><br>
  <label for="email" class="form-label">Updated Email:</label>
<input type="email" id="email" name="email" class="form-control"><br>

<button id="confirmEditSelf" class="btn btn-primary">Update Details</button>
</form>
</div>
`;
const confirmEditSelf = document.querySelector("#confirmEditSelf");

const editSelfFunc = async () => {
  const newName = document.querySelector("#newName").value;
  const newEmail = document.querySelector("#email").value;
  console.log(newName, newEmail);
  const updatedInfo = {};
  if (newName) updatedInfo["Name"] = newName;
  if (newEmail) updatedInfo["Email"] = newEmail;
  await fetch("http://localhost:5000/users/editSelf", {
    method: "PUT",
    body: JSON.stringify(updatedInfo),
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

      alert("Your Info is updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

editSelfButton.addEventListener("click", (e) => {
  e.preventDefault();
  contentBody.innerHTML = updateSelfForm;
});
const emptySpace = document.querySelector(".pageContent");
emptySpace.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id === "confirmEditSelf") {
    editSelfFunc(e);
  }
});
