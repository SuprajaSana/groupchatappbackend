let newMsgArr = [];
let arr = [];
let userArr = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("grpid");
    const response = await axios.get(
      `http://localhost:4000/get/grpusers?grpid=${id}`,
      {
        headers: { Authorization: token },
      }
    );
    showUsersListOnScreen(response.data.grps);
    showGroups();
    let locStoArr = localStorage.getItem("msgArr");
    if (locStoArr) {
      arr = JSON.parse(locStoArr);
      for (var i = 0; i < arr.length; i++) {
        showChatOnScreen(arr[i].sentBy, arr[i].msg);
      }
    }
    if (arr.length === 0) {
      showmsgs(id);
    }
  } catch (err) {
    console.log(err);
  }
});

const username = localStorage.getItem("username");

async function showUsersListOnScreen(users) {
  const parentNode = document.getElementById("listOfUsers");
  let childHTML;
  parentNode.innerHTML = "";
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("grpid");
  const response = await axios.get(
    `http://localhost:4000/getusers/grps?grpid=${id}`,
    {
      headers: { Authorization: token },
    }
  );
  const name = response.data.grps[0].createdBy;
  localStorage.setItem("grpby", name);
  for (var j = 0; j < users.length; j++) {
    if (users[j].isAdmin) {
      userArr.push(users[j].name);
    }
  }
  for (var i = 0; i < users.length; i++) {
    if (!users[i].isAdmin && username === name) {
      if (i === 0) {
        childHTML = `<li> ${name}
      <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button></li>`;
      } else {
        childHTML = `<li id=${users[i].id}> ${users[i].name}
      <button onclick="makeAsAdmin('${users[i].id},${users[i].name}')">Admin</button>
      <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button>
      </li>`;
      }
    } else if (
      !users[i].isAdmin &&
      username !== name &&
      userArr.includes(username)
    ) {
      if (i === 0) {
        childHTML = `<li> ${name}
        <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button></li>`;
      } else if (users[i].name === username) {
        childHTML = `<li id=${users[i].id}> ${users[i].name}
        <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button></li>`;
      } else {
        childHTML = `<li id=${users[i].id}> ${users[i].name}
      <button onclick="makeAsAdmin('${users[i].id},${users[i].name}')">Admin</button>
      <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button>
      </li>`;
      }
    } else if (
      !users[i].isAdmin &&
      username !== name &&
      !userArr.includes(username)
    ) {
      if (i === 0) {
        childHTML = `<li> ${name}</li>`;
      } else {
        childHTML = `<li id=${users[i].id}> ${users[i].name}</li>`;
      }
    } else if (
      users[i].isAdmin &&
      username !== users[i].name &&
      username !== name && !userArr.includes(username)
    ) {
      childHTML = `<li> ${users[i].name}</li>`;
    } else if (
      (users[i].isAdmin && username !== users[i].name && username === name) ||
      (users[i].isAdmin && username === users[i].name) ||
      (users[i].isAdmin &&
        username !== users[i].name &&
        username !== name &&
        userArr.includes(username))
    ) {
      childHTML = `<li> ${users[i].name}
      <button onclick="removeUserFromGrp('${users[i].id}')">Remove</button></li>`;
    }
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
    const id = localStorage.getItem("grpid");
    const response = await axios.post(
      `http://localhost:4000/send/messages?grpid=${id}`,
      obj,
      { headers: { Authorization: token } }
    );
    if (response.status === 201) {
      if (arr.length >= 10) {
        arr.shift();
      }
      arr.push({
        sentBy: response.data.messages.sentBy,
        msg: response.data.messages.message,
      });
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
    const grpid = localStorage.getItem("grpid");
    const response = await axios.get(
      `http://localhost:4000/get/messages?lastmsgid=${id}&grpid=${grpid}`,
      {
        headers: { Authorization: token },
      }
    );
    for (var i = 0; i < response.data.messages.length; i++) {
      showChatOnScreen(
        response.data.messages[i].sentBy,
        response.data.messages[i].message
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function showGroups() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:4000/get/groups", {
      headers: { Authorization: token },
    });
    for (var i = 0; i < response.data.grps.length; i++) {
      showGrpsOnScreen(response.data.grps[i].id, response.data.grps[i].grpName);
    }
  } catch (err) {
    console.log(err);
  }
}

async function showmsgs(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:4000/get/grpmessages?grpid=${id}`,
      {
        headers: { Authorization: token },
      }
    );
    for (var i = 0; i < response.data.messages.length; i++) {
      showChatOnScreen(
        response.data.messages[i].sentBy,
        response.data.messages[i].message
      );
      arr.push({
        sentBy: response.data.messages[i].sentBy,
        msg: response.data.messages[i].message,
      });
    }
    localStorage.setItem("msgArr", JSON.stringify(arr));
  } catch (err) {
    console.log(err);
  }
}

function showChatOnScreen(sentby, msg) {
  const parentHTML = document.getElementById("showChat");
  const childHTML = `<div>${sentby} - ${msg}</div>`;
  parentHTML.innerHTML = parentHTML.innerHTML + childHTML;
}

function showGrpsOnScreen(grpid, grp) {
  const grpby = localStorage.getItem("grpby");
  const groupId = localStorage.getItem("grpid");
  let childHTML;
  const parentHTML = document.getElementById("listOfGroups");
  if (username === grpby || userArr.includes(username)) {
    if (grpid == groupId) {
      childHTML = `<div ${grpid} style="display:flex;margin-bottom:10px">
  <div onclick="showUsersandChatOfGrp('${grpid}')">${grp}</div>
  <button onclick="addUserToGrp('${grpid}')" style="margin-left:20px">Add</button>
  </div>`;
    } else {
      childHTML = `<div ${grpid} style="display:flex;margin-bottom:10px">
  <div onclick="showUsersandChatOfGrp('${grpid}')">${grp}</div>
  </div>`;
    }
  } else {
    childHTML = `<div ${grpid} style="display:flex;margin-bottom:10px">
  <div onclick="showUsersandChatOfGrp('${grpid}')">${grp}</div>
  </div>`;
  }
  parentHTML.innerHTML = parentHTML.innerHTML + childHTML;
}

async function removeUserFromGrp(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:4000/removeuser/grp/${id}`,
      { headers: { Authorization: token } }
    );
    window.location.href = "./chat.html";
  } catch (err) {
    console.log(err);
  }
}

async function makeAsAdmin(id, name) {
  const gId = localStorage.getItem("grpid");
  const obj = {
    userid: id,
    userName: name,
    grpid: gId,
  };
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:4000/makeuser/admin/${id}`,
      obj,
      { headers: { Authorization: token } }
    );
    window.location.href = "./chat.html";
  } catch (err) {
    console.log(err);
  }
}

function addUserToGrp(id) {
  localStorage.setItem("grpid", id);
  window.location.href = "./usersmodal.html";
}

function showUsersandChatOfGrp(id) {
  localStorage.setItem("grpid", id);
  localStorage.setItem("msgArr", []);
  window.location.href = "./chat.html";
}

function createGrpHandler() {
  window.location.href = "./modal.html";
}
