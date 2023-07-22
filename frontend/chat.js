window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:4000/get/users");
      showUsersListOnScreen(response.data.users);
      showPastMessages();
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
      showChatOnScreen(response.data.messages.message)
    } else {
      throw new Error("Failed to send message");
    }
    document.getElementById("msg").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}

async function showPastMessages() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/get/messages", {
      headers: { Authorization: token },
    });

    for (var i = 0; i < response.data.messages.length; i++) {
      showChatOnScreen(response.data.messages[i].message);
    }
  } catch (err) {
    console.log(err);
  }
}

function showChatOnScreen(msg) {
  const parentHTML = document.getElementById("showChat");
  const childHTML = `<li>${msg}</li>`;
  parentHTML.innerHTML = parentHTML.innerHTML+childHTML;
}
