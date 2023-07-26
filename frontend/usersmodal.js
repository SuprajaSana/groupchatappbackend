var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

function clickButton() {
  modal.style.display = "block";
}

clickButton();

span.onclick = function () {
  window.location.href = "chat.html";
};

window.onclick = function (event) {
  if (event.target == modal) {
    window.location.href = "chat.html";
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/get/users", {
      headers: { Authorization: token },
    });
      showUsersListOnScreen(response.data.users);
  } catch (err) {
    console.log(err);
  }
});

function showUsersListOnScreen(users) {
  const parentNode = document.getElementById("listOfUsers");
  parentNode.innerHTML = "";
  for (var i = 0; i < users.length; i++) {
    const childHTML = `<div id=${users[i].id} onclick="addUserToGrp('${users[i].id}','${users[i].userName}')"> ${users[i].userName}</div>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
}

const gId = localStorage.getItem("grpid"); 
    
async function addUserToGrp(id,name) {
  const obj = {
      userid: id,
      userName: name,
      grpid:gId
  };
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/add/usertogrp",
      obj,
      { headers: { Authorization: token } }
    );
    if (response.status === 201) {
        alert("User successfully added to group");
        window.location.href="./chat.html"
    } else {
      throw new Error("Failed to add to group");
    }
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
