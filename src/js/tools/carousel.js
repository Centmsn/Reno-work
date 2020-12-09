import galImg01 from "../../assets/index-min-01.jpg";
import galImg02 from "../../assets/index-min-02.jpg";
import galImg03 from "../../assets/index-min-03.jpg";
import galImg04 from "../../assets/index-min-04.jpg";
import galImg05 from "../../assets/index-min-05.jpg";

class Gallery {
  constructor(config) {
    this.config = config;
    this.activeSlide = 0;
    this.delay = false;

    this.renderBanner();
  }

  renderBanner = () => {
    if (this.config.length < 4) {
      throw new Error("Incorrect number of slides. At least 4 required");
    }
    const arrows = document.querySelectorAll(".gallery__change-slide");

    arrows.forEach((arrow) =>
      arrow.addEventListener("click", this.changeSlide)
    );

    this.mobileListeners();
    this.renderCards();
  };

  mobileListeners = () => {
    const container = document.querySelector(".gallery");

    container.addEventListener("touchstart", this.mobileSlideChange);
    container.addEventListener("touchend", () => {
      const diff = Math.abs(this.touchStart - event.changedTouches[0].clientX);

      if (diff > 50) {
        if (event.changedTouches[0].clientX > this.touchStart) {
          this.changeSlide("left");
        } else {
          this.changeSlide("right");
        }
      }
    });
  };

  mobileSlideChange = (e) => {
    const touchStart = e.touches[0].clientX;

    this.touchStart = touchStart;
  };

  renderCards = () => {
    const cards = document.createDocumentFragment();

    this.config.forEach((element, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      if (this.activeSlide === index) {
        card.classList.add("card--active");
      } else if (index === this.activeSlide + 1) {
        card.classList.add("card--inactive-right");
      } else if (index === this.activeSlide - 1) {
        card.classList.add("card--inactive-left");
      }

      const imgContainer = document.createElement("div");
      imgContainer.classList.add("card__img-container");

      const img = document.createElement("img");
      img.setAttribute("src", element.img);
      img.setAttribute("alt", element.title);
      img.classList.add("card__img");

      const title = document.createElement("div");
      title.classList.add("card__title");
      title.textContent = element.title;

      const desc = document.createElement("div");
      desc.classList.add("card__description");
      desc.innerHTML = element.desc;

      imgContainer.appendChild(img);
      card.appendChild(imgContainer);
      card.appendChild(title);
      card.appendChild(desc);

      cards.appendChild(card);
    });

    document.querySelector(".gallery__inner-container").appendChild(cards);
    this.displayNewSlide();
  };

  changeSlide = (e) => {
    const container = document.querySelector(".gallery__inner-container");

    const direction =
      typeof e === "string"
        ? e === "left"
        : e.clientX < container.clientWidth / 2;

    if (!this.delay) {
      this.delay = true;
      if (direction) {
        if (this.activeSlide === 0) {
          this.activeSlide = this.config.length - 1;
        } else {
          this.activeSlide = this.activeSlide - 1;
        }
      } else {
        if (this.activeSlide === this.config.length - 1) {
          this.activeSlide = 0;
        } else {
          this.activeSlide = this.activeSlide + 1;
        }
      }
      this.displayNewSlide();
      setTimeout(() => {
        this.delay = false;
      }, 500);
    }
  };

  displayNewSlide = () => {
    const cards = document.querySelectorAll(".card");
    const leftIndex =
      this.activeSlide - 1 < 0 ? this.config.length - 1 : this.activeSlide - 1;
    const rightIndex =
      this.activeSlide + 1 > this.config.length - 1 ? 0 : this.activeSlide + 1;

    cards.forEach((card) => {
      card.classList.remove(
        "card--active",
        "card--inactive-left",
        "card--inactive-right"
      );
      card.removeEventListener("click", this.changeSlide);
    });

    // add class and listener to side card
    cards[leftIndex].classList.add("card--inactive-left");
    cards[leftIndex].addEventListener("click", this.changeSlide);
    // add class to active card
    cards[this.activeSlide].classList.add("card--active");
    // add class and listener to side card
    cards[rightIndex].classList.add("card--inactive-right");
    cards[rightIndex].addEventListener("click", this.changeSlide);
  };
}

const gallerySlides = [
  {
    img: galImg01,
    title: "Jakość",
    desc:
      "Używamy tylko najwyższej jakości farb, lakierów oraz innych materiałów.",
  },
  {
    img: galImg03,
    title: "Precyzja",
    desc:
      "Do projektów wymagających precyzji podchodzimy ze szczególną uwagą, każdy detal ma znaczenie.",
  },
  {
    img: galImg02,
    title: "Wsparcie",
    desc:
      "Podczas wykonywania prac klient może liczyć na stały kontakt oraz pomoc.",
  },
  {
    img: galImg04,
    title: "Terminowość",
    desc: "Wszystkie projekty realizujemy w czasie uzgodnionym z klientem. ",
  },
  {
    img: galImg05,
    title: "Profesjonalizm",
    desc:
      "Sprawdź opinie innych klientów na <a href='https://fixly.pl/profil/HEOP50cV' target='_blank' class='card__link' title='Nasz profil na Fixly'>Fixly.pl</a> i postaw na profesjonalizm!",
  },
];

new Gallery(gallerySlides);
