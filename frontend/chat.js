let newMsgArr = [];
let arr = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:4000/get/users");
    showUsersListOnScreen(response.data.users);
    let locStoArr = localStorage.getItem("msgArr");
    if (locStoArr) {
      arr = JSON.parse(locStoArr);
      for (var i = 0; i < arr.length; i++) {
        showChatOnScreen(arr[i]);
      }
    }
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
      if (arr.length >= 10) {
        arr.shift();
      }
      arr.push(response.data.messages.message);
      localStorage.setItem("msgArr", JSON.stringify(arr));
      showPastMessages(response.data.messages.id);
    } else {
      throw new Error("Failed to send message");
    }
    document.getElementById("msg").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}

async function showPastMessages(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:4000/get/messages?lastmsgid=${id}`,
      {
        headers: { Authorization: token },
      }
    );
    console.log(response.data);
    for (var i = 0; i < response.data.messages.length; i++) {
      showChatOnScreen(response.data.messages[i].message);
    }
  } catch (err) {
    console.log(err);
  }
}

function showChatOnScreen(msg) {
  const parentHTML = document.getElementById("showChat");
  const childHTML = `<div>${msg}</div>`;
  parentHTML.innerHTML = parentHTML.innerHTML + childHTML;
}
