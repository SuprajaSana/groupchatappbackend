window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("http://localhost:4000/get/users");
    showUsersListOnScreen(response.data.users)
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