const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    message.textContent = "Please enter your email and password.";
    return;
  }

  message.textContent = "Login is not connected yet.";
});
