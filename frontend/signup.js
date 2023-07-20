async function postUserDetails(e) {
  e.preventDefault();
  const userName = e.target.name.value;
  const email = e.target.email.value;
  const phonenumber = e.target.phonenumber.value;
  const password = e.target.password.value;

  const obj = {
    userName,
    email,
    phonenumber,
    password,
  };

  try {
    const response = await axios.post("http://localhost:4000/user/signup", obj);
    if (response.status === 201) {
      alert("Successfully signed up");
      window.location.href = "./login.html";
    } else if (response.status === 208) {
      alert("User already exists PLEASE LOGIN");
    } else {
      throw new Error("Failed to signup");
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phonenumber").value = "";
    document.getElementById("password").value = "";
  } catch (err) {
    document.body.innerHTML += `<div style="color:red;text-align:center;">${err.message}</div>`;
  }
}
