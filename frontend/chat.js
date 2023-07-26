let newMsgArr = [];
let arr = [];

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
        showChatOnScreen(arr[i].sentBy,arr[i].msg);
      }
    }
    if (arr.length === 0) {
      showmsgs(id)
    }
  } catch (err) {
    console.log(err);
  }
});

async function showUsersListOnScreen(users) {
  const parentNode = document.getElementById("listOfUsers");
  let childHTML;
  parentNode.innerHTML = "";
  for (var i = 0; i < users.length; i++) {
    if (i === 0) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("grpid");
      const response = await axios.get(
      `http://localhost:4000/getusers/grps?grpid=${id}`,
      {
        headers: { Authorization: token },
      }
      );
      const name=response.data.grps[0].createdBy
      childHTML = `<li> ${name}</li>`;
    } else if (i > 0 && name === users[i].name) {
      childHTML = "";
    } else {
      childHTML = `<li id=${users[i].id}> ${users[i].name}</li>`;
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
      arr.push({ sentBy:response.data.messages.sentBy, msg:response.data.messages.message });
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
      showChatOnScreen(response.data.messages[i].sentBy,response.data.messages[i].message);
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
     const response = await axios.get(`http://localhost:4000/get/grpmessages?grpid=${id}`, {
       headers: { Authorization: token },
     });
     for (var i = 0; i < response.data.messages.length; i++) {
       showChatOnScreen(response.data.messages[i].sentBy,response.data.messages[i].message);
       arr.push({ sentBy: response.data.messages[i].sentBy, msg: response.data.messages[i].message });
    } 
    localStorage.setItem("msgArr", JSON.stringify(arr));
   } catch (err) {
     console.log(err);
   }
}

function showChatOnScreen(sentby,msg) {
  const parentHTML = document.getElementById("showChat");
  const childHTML = `<div>${sentby} - ${msg}</div>`;
  parentHTML.innerHTML = parentHTML.innerHTML + childHTML;
}

function showGrpsOnScreen(grpid, grp) {
  const parentHTML = document.getElementById("listOfGroups");
  const childHTML = `<div ${grpid} style="display:flex;margin-bottom:10px">
  <div onclick="showUsersandChatOfGrp('${grpid}')">${grp}</div>
  <button onclick="addUserToGrp('${grpid}')" style="margin-left:20px">Add</button>
  </div>`;
  parentHTML.innerHTML = parentHTML.innerHTML + childHTML;
}

function addUserToGrp(id) {
  localStorage.setItem("grpid", id);
  window.location.href = "./usersmodal.html";
}

function showUsersandChatOfGrp(id) {
  localStorage.setItem("grpid", id);
  localStorage.setItem("msgArr",[])
  window.location.href = "./chat.html";
}

function createGrpHandler() {
  window.location.href = "./modal.html";
}
