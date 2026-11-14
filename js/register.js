const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

function setupToggle(buttonId, input) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function () {
    if (input.type === "password") {
      input.type = "text";
      button.textContent = "Hide";
    } else {
      input.type = "password";
      button.textContent = "Show";
    }
  });
}

setupToggle("togglePassword", password);
setupToggle("toggleConfirm", confirmPassword);

function showError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  if (input) {
    input.classList.toggle("invalid", message !== "");
  }
}

function checkName() {
  if (fullName.value.trim() === "") {
    showError(fullName, "fullNameError", "Please enter your full name.");
    return false;
  }
  showError(fullName, "fullNameError", "");
  return true;
}

function checkEmail() {
  const value = email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError(email, "emailError", "Please enter your email.");
    return false;
  }
  if (!emailPattern.test(value)) {
    showError(email, "emailError", "Please enter a valid email address.");
    return false;
  }
  showError(email, "emailError", "");
  return true;
}

function checkPassword() {
  const value = password.value;

  if (value === "") {
    showError(password, "passwordError", "Please enter a password.");
    return false;
  }
  if (value.length < 8) {
    showError(password, "passwordError", "Password must be at least 8 characters.");
    return false;
  }

  if (!/[A-Z]/.test(value)) {
    showError(password, "passwordError", "Password must have at least one capital letter.");
    return false;
  }

  if (!/[^A-Za-z0-9]/.test(value)) {
    showError(password, "passwordError", "Password must have a special character like @ or $.");
    return false;
  }
  showError(password, "passwordError", "");
  return true;
}

function checkConfirm() {
  if (confirmPassword.value === "") {
    showError(confirmPassword, "confirmError", "Please confirm your password.");
    return false;
  }
  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "confirmError", "Passwords do not match.");
    return false;
  }
  showError(confirmPassword, "confirmError", "");
  return true;
}

function checkTerms() {
  if (!terms.checked) {
    showError(null, "termsError", "You need to agree to the terms.");
    return false;
  }
  showError(null, "termsError", "");
  return true;
}

fullName.addEventListener("input", checkName);
email.addEventListener("input", checkEmail);
password.addEventListener("input", function () {
  checkPassword();
  if (confirmPassword.value !== "") {
    checkConfirm();
  }
});
confirmPassword.addEventListener("input", checkConfirm);
terms.addEventListener("change", checkTerms);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameOk = checkName();
  const emailOk = checkEmail();
  const passwordOk = checkPassword();
  const confirmOk = checkConfirm();
  const termsOk = checkTerms();

  if (nameOk && emailOk && passwordOk && confirmOk && termsOk) {
    sessionStorage.setItem("userName", fullName.value.trim());
    window.location.href = "success.html";
  }
});
