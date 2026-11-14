const name = sessionStorage.getItem("userName");

if (name) {
  const firstName = name.split(" ")[0];
  document.getElementById("welcomeText").textContent =
    "Welcome, " + firstName + "! Your account is ready. You can log in now.";
  sessionStorage.removeItem("userName");
}
