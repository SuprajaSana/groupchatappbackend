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

async function createGrp(e) {
  e.preventDefault();
  const grp = e.target.grpname.value;

  const obj = {
    grp,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/create/groups",
      obj,
      { headers: { Authorization: token } }
    );
    if (response.status === 201) {
        alert("Successfully created group");
        localStorage.setItem("grpid", response.data.grpName.id);
    } else {
      throw new Error("Failed to create group");
    }
    window.location.href = "chat.html";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
