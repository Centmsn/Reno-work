import "../sass/projects.scss";
import "./tools/backtotop";
import gsap from "gsap";

import img0 from "../assets/gal15.jpg";
import img1 from "../assets/gal02.jpg";
import img2 from "../assets/gal03.jpg";
import img3 from "../assets/gal04.jpg";

class Gallery {
  constructor(config) {
    this.config = config;
  }

  createThumbnails = () => {
    const sections = Object.keys(this.config);
    const docFragment = document.createDocumentFragment();
    const galleryContainer = document.querySelector(".gallery");

    sections.forEach((section, index) => {
      const container = document.createElement("section");
      container.classList.add("gallery__thumbnail");

      container.style.backgroundImage = `url(${config[section].mainImg})`;

      container.addEventListener("click", (e) => this.toggleDetails(e, index));
      docFragment.appendChild(container);
    });

    galleryContainer.appendChild(docFragment);
  };

  toggleDetails = (id) => {
    console.log(id);
  };
}

const config = {
  0: { mainImg: img0, images: {}, description: "example description" },
  1: { mainImg: img1, images: {}, description: "example description" },
  2: { mainImg: img2, images: {}, description: "example description" },
  3: { mainImg: img3, images: {}, description: "example description" },
};

document.addEventListener("DOMContentLoaded", () => {
  const gallery = new Gallery(config);

  gallery.createThumbnails();
});
