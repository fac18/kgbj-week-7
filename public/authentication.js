// const loginPassword = document.getElementById("loginPassword");
// const loginName = document.getElementById("loginName");


const createUsername = document.querySelector("#createUsername");
const createPassword = document.querySelector("#createPassword");
const confirmPassword = document.querySelector("#confirmPassword");
console.log("this is the confirmpass", confirmPassword);
console.log({createPassword});


// var usernameErr = document.getElementById("usernameErr");
// Potential stretch goal: validate that a username does not already exist

const passwordErr = document.querySelector("#passwordErr");
const confirmErr = document.querySelector("#confirmErr");



const checkPw = () => {
    console.log("you should check your password")

    if (createPassword.validity.patternMismatch) {
        displayErr(
            passwordErr, 
            "Password must contain at least eight characters, including one letter and one number"
        ); 
    } else if (password.validity.valueMissing) {
        displayErr(passwordErr, "please enter a password");
    } else {
        displayErr(passwordErr, "")
        return true;
    }
    
}; 

const confirmPw = () => {
    console.log("you should confirm your password")
    if (createPassword.value!== confirmPassword.value) {
        displayErr(confirmErr, "passwords do not match")
        
    } else if (confirmPassword.validity.valueMissing) {
        displayErr(confirmErr, "Please confirm your password");
      } else {
        displayErr(confirmErr, "");
        return true;
      }
    };

const displayErr = (errElem, errMsg) => {
      errElem.textContent = errMsg;
    }

createPassword.addEventListener("focusout", checkPw);
confirmPassword.addEventListener("focusout", confirmPw);