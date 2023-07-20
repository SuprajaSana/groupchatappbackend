window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:4000/get/users");
    showUsersListOnScreen(response.data.users);
  } catch (err) {
    console.log(err);
  }
});
function showUsersListOnScreen(users) {
  const parentNode = document.getElementById("listOfUsers");
  parentNode.innerHTML = "";
  for (var i = 0; i < users.length; i++) {
    const childHTML = `<li id=${users[i].id}> ${users[i].userName}</li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
}

async function sendMsgHandler(e) {
  e.preventDefault();
  const msg = e.target.msg.value;

  const obj = {
    msg,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/send/messages",
      obj,
      { headers: { Authorization: token } }
    );
    if (response.status === 201) {
      console.log("Message Sent");
    } else {
      throw new Error("Failed to send message");
    }

    document.getElementById("msg").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
