export const HOME = [
  document.querySelector(".header__filter"),
  document.querySelector(".header__slogan"),
  document.querySelector(".company-description"),
  ...document.querySelectorAll(".company-description__card"),
  document.querySelector(".company-description__link"),
  document.querySelector(".main-gallery"),
  document.querySelector(".main-gallery__title"),
  ...document.querySelectorAll(".card"),
];

export const SERVICES = [
  document.querySelector(".wrapper"),
  ...document.querySelectorAll(".card"),
  document.querySelector(".collapsible__body"),
  ...document.querySelectorAll(".collapsible__card"),
  ...document.querySelectorAll(".collapsible__header"),
  ...document.querySelectorAll(".collapsible__list"),
  ...document.querySelectorAll(".collapsible__list-item"),
  document.querySelector(".side-bar"),
];

export const CONTACT = [
  document.querySelector(".main-container"),
  document.querySelector(".form__submit-btn"),
];

export const PROJECTS = [document.querySelector(".projects-gallery__title")];
