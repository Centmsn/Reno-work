import { CONTACT, HOME, PROJECTS, SERVICES } from "./elements";

let page;

switch (window.location.pathname) {
  case "/index.html":
    page = HOME;
    break;

  case "/services.html":
    page = SERVICES;
    break;

  case "/contact.html":
    page = CONTACT;
    break;

  case "/projects.html":
    page = PROJECTS;
    break;

  default:
    page = HOME;
    break;
}

const elements = [
  document.querySelector(".navigation"),
  ...document.querySelectorAll(".navigation__item"),
  document.querySelector(".navigation__darkmode"),
  document.querySelector(".footer"),
].concat(page);

class Darkmode {
  constructor(elements) {
    this.elements = elements;
    document
      .querySelector(".navigation__darkmode")
      .addEventListener("click", this.setDarkmode);

    this.triggerDarkmode(this.getMode());
  }

  setDarkmode = () => {
    if (this.getMode()) {
      localStorage.setItem("darkmode", "false");
      this.triggerDarkmode(false);
    } else {
      localStorage.setItem("darkmode", "true");
      this.triggerDarkmode(true);
    }
  };

  getMode = () => {
    const darkmode = localStorage.getItem("darkmode");

    if (darkmode && darkmode === "true") return true;
    else if ((darkmode && darkmode === "false") || darkmode === null)
      return false;
  };

  triggerDarkmode = (isDark) => {
    if (isDark) {
      this.elements.forEach((el) => {
        el.classList.add(`${el.classList[0]}--dark`);
      });
      document.body.style.backgroundColor = "rgb(56, 56, 56)";
    } else {
      this.elements.forEach((el) => {
        el.classList.remove(`${el.classList[0]}--dark`);
      });
      document.body.style.backgroundColor = "";
    }
  };
}

new Darkmode(elements);
