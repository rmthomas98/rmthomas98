"use strict";

const signupForm = document.querySelector(".signup-form");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector(".password-check");
const passwordTimes = document.querySelector(".password-times");
const signupBtn = document.querySelector(".signup-submit");
const confirmPass = document.querySelector("#confirm-password");
const confirmPassCheck = document.querySelector(".confirm-password-check");
const confirmPassTimes = document.querySelector(".confirm-password-times");
const loader = document.querySelector(".loader");

function checkPassword() {
  if (password.value.length >= 8) {
    passwordCheck.style.opacity = "100%";
    passwordTimes.style.opacity = "0%";
    password.style.border = "1px solid #5cff4b";
  } else {
    passwordCheck.style.opacity = "0%";
    passwordTimes.style.opacity = "100%";
    password.style.border = "1px solid #ff7979";
  }
}

function updatePassword(e) {
  if (e.key === "Backspace" && confirmPass.value.length > 0) {
    confirmPassCheck.style.opacity = "0%";
    confirmPassTimes.style.opacity = "100%";
    confirmPass.style.border = "1px solid #ff7979";
  }
  if (password.value === confirmPass.value && confirmPass.value.length >= 8) {
    confirmPassCheck.style.opacity = "100%";
    confirmPassTimes.style.opacity = "0%";
    confirmPass.style.border = "1px solid #5cff4b";
  }
}

function checkConfirmPassword() {
  if (
    confirmPass.value === password.value &&
    confirmPass.value.length >= 8 &&
    password.value.length >= 8
  ) {
    confirmPassCheck.style.opacity = "100%";
    confirmPassTimes.style.opacity = "0%";
    confirmPass.style.border = "1px solid #5cff4b";
  } else {
    confirmPassCheck.style.opacity = "0%";
    confirmPassTimes.style.opacity = "100%";
    confirmPass.style.border = "1px solid #ff7979";
  }
}

function validateForm(e) {
  if (password.value !== confirmPass.value) {
    e.preventDefault();
  } else if (signupForm.checkValidity()) {
    loader.style.zIndex = "9999";
    loader.style.animation = "fadeIn 0.5s";
  }
}

const blurBackground = document.querySelector(".blur-background");
const errorContainer = document.querySelector(".email-error-container");

function closeModal() {
  blurBackground.style.opacity = 0;
  blurBackground.style.zIndex = -1;
  errorContainer.style.opacity = 0;
  errorContainer.style.zIndex = -1;
}
