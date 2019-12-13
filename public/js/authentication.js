
const createUsername = document.querySelector("#createUsername");
const createPassword = document.querySelector("#createPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const passwordErr = document.querySelector("#passwordErr");
const confirmErr = document.querySelector("#confirmErr");

const checkPw = () => {
  if (createPassword.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, "please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const confirmPw = () => {
  if (createPassword.value !== confirmPassword.value) {
    displayErr(confirmErr, "passwords do not match");
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

createPassword.addEventListener("focusout", checkPw);
confirmPassword.addEventListener("focusout", confirmPw);
