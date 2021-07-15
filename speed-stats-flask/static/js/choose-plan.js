"use strict";

const loader = document.querySelector(".loader");
document.querySelector(".s04d-pricing-button").addEventListener("click", () => {
  loader.style.zIndex = "9999";
  loader.style.animation = "fadeIn 0.5s";
});

document.querySelector(".select-button").addEventListener("click", () => {
  loader.style.zIndex = "9999";
  loader.style.animation = "fadeIn 0.5s";
});
