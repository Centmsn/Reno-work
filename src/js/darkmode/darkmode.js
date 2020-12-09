import Darkmode from "../tools/darkmode";
import { home, services } from "./elements";

let page;
console.log(window.location.pathname);
switch (window.location.pathname) {
  case "/index.html":
    page = home;
    break;

  case "/services.html":
    page = services;
    break;

  default:
    break;
}

const mode = new Darkmode();
const elements = [
  document.querySelector(".navigation"),
  ...document.querySelectorAll(".navigation__item"),
  document.querySelector(".navigation__darkmode"),
].concat(page);

const switchMode = () => {
  mode.toggleDarkmode();
  triggerDarkmode();
};

const triggerDarkmode = () => {
  if (mode.getMode()) {
    elements.forEach((el) => {
      el.classList.add(`${el.classList[0]}--dark`);
    });
  } else {
    elements.forEach((el) => {
      el.classList.remove(`${el.classList[0]}--dark`);
    });
  }
};

if (mode.getMode()) {
  triggerDarkmode();
}

document
  .querySelector(".navigation__darkmode")
  .addEventListener("click", switchMode);
