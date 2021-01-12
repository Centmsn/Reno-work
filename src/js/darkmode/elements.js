const ELEMENTS = {
  HOME: [
    document.querySelector(".header__filter"),
    document.querySelector(".header__slogan"),
    document.querySelector(".company-description"),
    ...document.querySelectorAll(".company-description__card"),
    document.querySelector(".company-description__link"),
    document.querySelector(".main-gallery"),
    document.querySelector(".main-gallery__title"),
    ...document.querySelectorAll(".card"),
  ],

  SERVICES: [
    document.querySelector(".wrapper"),
    ...document.querySelectorAll(".card"),
    document.querySelector(".collapsible__body"),
    ...document.querySelectorAll(".collapsible__card"),
    ...document.querySelectorAll(".collapsible__header"),
    ...document.querySelectorAll(".collapsible__list"),
    ...document.querySelectorAll(".collapsible__list-item"),
    document.querySelector(".side-bar"),
    document.querySelector(".media-container"),
    document.querySelector(".media-container__link"),
  ],

  CONTACT: [
    document.querySelector(".main-container"),
    document.querySelector(".form__submit-btn"),
  ],

  PROJECTS: [document.querySelector(".projects-gallery__title")],
  DEFAULTS: [
    document.querySelector(".navigation"),
    ...document.querySelectorAll(".navigation__item"),
    document.querySelector(".navigation__darkmode"),
    document.querySelector(".footer"),
  ],
};

export default ELEMENTS;
