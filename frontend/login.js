async function postUserDetails(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const obj = {
    email,
    password,
  };

  try {
    const response = await axios.post("http://localhost:4000/user/login", obj);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("grpid", 0);
      localStorage.setItem("msgArr",[])
      window.location.href = "./chat.html";
    }

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
