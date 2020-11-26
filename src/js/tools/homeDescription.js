const className = "company-description__card";
const descCards = document.querySelectorAll(`.${className}`);

descCards.forEach((card) => {
  const { top, height } = card.getBoundingClientRect();

  if (window.innerHeight > top + height) {
    setTimeout(() => card.classList.add(`${className}--visible`), 1000);
  }
});

window.addEventListener("scroll", () => {
  descCards.forEach((card) => {
    const { top, height } = card.getBoundingClientRect();

    if (scrollY + height + 30 >= top) {
      card.classList.add(`${className}--visible`);
    }
  });
});
