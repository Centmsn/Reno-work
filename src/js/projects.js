import "../sass/projects.scss";
import "./tools/backtotop";

class Gallery {
  constructor() {
    this.container = document.getElementById("gallery");
    this.fullScreen = document.querySelector(".full-screen");

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

    const fullScreenContainer = document.createElement("div");
    const imgContainer = document.createElement("div");

    imgContainer.classList.add("full-screen__img-container");

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("full-screen__close-btn");
    closeBtn.addEventListener("click", this.closeFullScreen);
    closeBtn.innerHTML = "&#10006;";

    fullScreenContainer.classList.add("full-screen__container");

    const activeImg = document.createElement("img");
    activeImg.setAttribute(
      "src",
      document.querySelector(`img[data-key="${key}"]`).getAttribute("src")
    );
    activeImg.classList.add("full-screen__img");
    const verticalImages = document.querySelectorAll(
      ".gallery__thumbnail--vertical"
    );

    for (let i = 0; i < verticalImages.length; i++) {
      if (parseInt(verticalImages[i].dataset.key) === key) {
        activeImg.classList.add("full-screen__img--vertical");
      }
    }
    activeImg.setAttribute("data-key", key);
    imgContainer.appendChild(activeImg);

    fullScreenContainer.appendChild(imgContainer);
    fullScreenContainer.appendChild(closeBtn);
    this.fullScreen.appendChild(fullScreenContainer);
    this.addArrows();
    this.addCounter(key);
    this.changeArrowsStyle(key);
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

  changeActiveImg = (e) => {
    const currentImg = parseInt(
      document.querySelector(".full-screen__img").dataset.key
    );

    if (e.target.classList.contains("full-screen__left-arrow")) {
      if (currentImg - 1 < 0) {
        return;
      }
      this.displayFullScreen(currentImg - 1);
    } else {
      if (
        currentImg + 1 >
        document.querySelectorAll(".gallery__thumbnail").length - 1
      ) {
        return;
      }
      this.displayFullScreen(currentImg + 1);
    }
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
