import mobileBG from "../../assets/index-min-06.jpg";

window.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video");
  const header = document.querySelector("header");

  if (window.innerWidth < 800) {
    video.style.display = "none";
    header.style.background = `url(${mobileBG})`;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth < 800) {
      video.style.display = "none";

      header.style.background = `url(${mobileBG})`;
    } else {
      video.style.display = "";
      header.style.background = "";
    }
  });
});
