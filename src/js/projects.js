import "../sass/projects.scss";
import "./tools/backtotop";
import "./darkmode/darkmode";
import gsap from "gsap";

class Gallery {
  constructor() {
    this.container = document.getElementById("gallery");
    this.fullScreen = document.querySelector(".full-screen");
    this.throttle = true;

    this.adjustImages();
  }

  adjustImages = () => {
    const images = document.querySelectorAll(".gallery__thumbnail");
    images.forEach((img, index) => {
      img.setAttribute("data-key", index);
      img.addEventListener("click", (e) =>
        this.displayFullScreen(parseInt(e.target.dataset.key))
      );
    });
  };

  displayFullScreen = (key) => {
    if (window.innerWidth < 400) return;
    this.fullScreen.innerHTML = "";
    const img = this.createImg(key);

    const fullScreenContainer = document.createElement("div");
    const imgContainer = document.createElement("div");

    imgContainer.classList.add("full-screen__img-container");

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("full-screen__close-btn");
    closeBtn.addEventListener("click", this.closeFullScreen);
    closeBtn.innerHTML = "&#10006;";

    fullScreenContainer.classList.add("full-screen__container");

    imgContainer.appendChild(img);

    fullScreenContainer.appendChild(imgContainer);
    fullScreenContainer.appendChild(closeBtn);
    this.fullScreen.appendChild(fullScreenContainer);
    this.addArrows();
    this.addCounter(key);
    this.changeArrowsStyle(key);
  };

  createImg = (key) => {
    const activeImg = document.createElement("img");
    const verticalImages = document.querySelectorAll(
      ".gallery__thumbnail--vertical"
    );

    activeImg.setAttribute(
      "src",
      document.querySelector(`img[data-key="${key}"]`).getAttribute("src")
    );
    activeImg.classList.add("full-screen__img");

    for (let i = 0; i < verticalImages.length; i++) {
      if (parseInt(verticalImages[i].dataset.key) === key) {
        activeImg.classList.add("full-screen__img--vertical");
      }
    }
    activeImg.setAttribute("data-key", key);

    return activeImg;
  };

  closeFullScreen = () => {
    document.querySelector(".full-screen").innerHTML = "";
  };

  addArrows = () => {
    for (let i = 0; i < 2; i++) {
      const arrow = document.createElement("div");
      arrow.classList.add(
        i === 0 ? "full-screen__left-arrow" : "full-screen__right-arrow"
      );
      arrow.innerHTML = i === 0 ? "&#10094;" : "&#10095;";
      arrow.addEventListener("click", this.changeActiveImg);
      document.querySelector(".full-screen__container").appendChild(arrow);
    }
  };

  addCounter = (key) => {
    const counter = document.createElement("div");
    counter.classList.add("full-screen__counter");

    counter.innerHTML = `${parseInt(key) + 1}/${
      document.querySelectorAll(".gallery__thumbnail").length
    }`;

    document.querySelector(".full-screen__container").appendChild(counter);
  };

  updateCounter = (key) => {
    document.querySelector(".full-screen__counter").innerHTML = `${key + 1} / ${
      document.querySelectorAll(".gallery__thumbnail").length
    }`;

    this.changeArrowsStyle(key);
  };

  changeActiveImg = (e) => {
    if (
      currentImg - 1 < 0 ||
      currentImg + 1 >
        document.querySelectorAll(".gallery__thumbnail").length - 1
    ) {
      return;
    }

    if (!this.throttle) return;
    this.throttle = false;

    setTimeout(() => {
      this.throttle = true;
    }, 300);

    const currentImg = document.querySelector(".full-screen__img");
    const key = parseInt(currentImg.dataset.key);
    const nextImgKey =
      key + (e.target.classList.contains("full-screen__left-arrow") ? -1 : 1);
    const container = document.querySelector(".full-screen__img-container");
    console.log(nextImgKey);
    if (e.target.classList.contains("full-screen__left-arrow")) {
      const prevImg = this.createImg(nextImgKey);
      container.appendChild(prevImg);
      const tl = gsap.timeline({ defaults: { duration: 0.25 } });

      gsap.set(prevImg, { x: "-100vw" });
      tl.to(currentImg, { x: "100vw" }).to(
        prevImg,
        {
          x: 0,
        },
        "-=0.3"
      );
    } else {
      const nextImg = this.createImg(key + 1);
      container.appendChild(nextImg);
      const tl = gsap.timeline({
        defaults: {
          duration: 0.25,
        },
      });

      gsap.set(nextImg, { x: "100vw" });
      tl.to(currentImg, { x: "-100vw" }).to(
        nextImg,
        {
          x: 0,
        },
        "-=0.3"
      );
    }

    this.updateCounter(nextImgKey);

    setTimeout(() => {
      container.removeChild(currentImg);
    }, 250);
  };

  changeArrowsStyle = (index) => {
    const leftArrow = document.querySelector(".full-screen__left-arrow");
    const rightArrow = document.querySelector(".full-screen__right-arrow");
    const inactive = "full-screen__arrow-inactive";

    if (index === 0) {
      leftArrow.classList.add(inactive);
    } else if (
      index ===
      document.querySelectorAll(".gallery__thumbnail").length - 1
    ) {
      rightArrow.classList.add(inactive);
    } else {
      leftArrow.classList.remove(inactive);
      rightArrow.classList.remove(inactive);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  new Gallery();
});
