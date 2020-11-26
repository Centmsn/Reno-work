const displayBtn = () => {
  const btn = document.querySelector(".back-to-top");

  const footerPosition = document.body.scrollHeight - window.innerHeight * 0.18;

  if (pageYOffset > 100) {
    btn.style.opacity = "1";
    btn.style.visibility = "visible";
  } else {
    btn.style.opacity = "0";
    btn.style.visibility = "hidden";
  }

  if (pageYOffset + window.innerHeight > footerPosition) {
    btn.style.bottom = `${window.innerHeight * 0.18}px`;
  } else {
    btn.style.bottom = "2vmin";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 800) {
    window.addEventListener("scroll", displayBtn);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    window.addEventListener("scroll", displayBtn);
  } else {
    window.removeEventListener("scroll", displayBtn);
  }
});
