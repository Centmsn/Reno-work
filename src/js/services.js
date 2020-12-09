import "../sass/services.scss";
import "./tools/backtotop";
import "./darkmode/darkmode";
import gsap from "gsap";

let throttle = true;

window.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".collapsible__header");
  const bolt = document.querySelector(".fa-bolt");
  const hammer = document.querySelector(".fa-hammer");
  const roller = document.querySelector(".fa-paint-roller");
  const wrench = document.querySelector(".fa-wrench");
  let isClosed = true;

  gsap.to(bolt, {
    color: "yellow",
    repeat: -1,
    duration: 1,
    repeatDelay: 3,
    yoyo: true,
    ease: "bounce.out",
  });

  const hammerTl = gsap.timeline({
    defaults: { duration: 0.2, repeat: -1, repeatDelay: 3.5 },
  });
  const rollerTl = gsap.timeline({
    defaults: { repeatDelay: 4, repeat: -1, duration: 0.4 },
  });
  const wrenchTl = gsap.timeline({
    defaults: {
      transformOrigin: "top right",
      duration: 0.4,
      repeat: -1,
      repeatDelay: 4.5,
    },
  });

  rollerTl
    .to(roller, {
      y: "5px",
    })
    .to(roller, { y: 0 });

  hammerTl
    .to(hammer, {
      rotation: 15,
      transformOrigin: "bottom left",
    })
    .to(hammer, { rotation: 0 });

  wrenchTl.to(wrench, { rotation: -25 }).to(wrench, { rotation: 0 });

  header.addEventListener("click", () => {
    toggleCollapsibleVisibility(isClosed);
    isClosed = !isClosed;
  });
});

const toggleCollapsibleVisibility = (forward) => {
  if (throttle) {
    throttle = false;

    setTimeout(() => {
      throttle = true;
    }, 500);
    const collapsible = document.querySelector(".collapsible__body");
    const icon = document.querySelector(".collapsible__icon");
    const cards = document.querySelectorAll(".collapsible__card");
    const header = document.querySelector(".collapsible__header");
    const tooltip = document.querySelector(".collapsible__tooltip");

    if (forward) {
      tooltip.textContent = "kliknij żeby zwinąć";
    } else {
      tooltip.textContent = "kliknij żeby rozwinąć";
    }

    const { top } = header.getBoundingClientRect();

    const tl = gsap.timeline({ defaults: { duration: 0.3 } });

    if (forward) {
      window.scroll({
        top: top + scrollY,
      });

      tl.to(collapsible, { height: "100vh" })
        .to(icon, { rotation: 45, duration: 0.1 }, "-=0.3")
        .to(cards, { stagger: 0.2, scale: 1 });
    } else {
      tl.to(cards, { stagger: 0.1, scale: 0 })
        .to(collapsible, { height: 0 })
        .to(icon, { rotation: 0, duration: 0.1 }, "-=0.3");
    }
  }
};
