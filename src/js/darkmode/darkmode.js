class Darkmode {
  constructor(elements) {
    this.elements = elements;
    document
      .querySelector(".navigation__darkmode")
      .addEventListener("click", this.setDarkmode);

    console.log(this.elements);
    this.triggerDarkmode(this.getMode());
  }

  setDarkmode = () => {
    if (this.getMode()) {
      localStorage.setItem("darkmode", "false");
      this.triggerDarkmode(false);
    } else {
      localStorage.setItem("darkmode", "true");
      this.triggerDarkmode(true);
    }
  };

  getMode = () => {
    const darkmode = localStorage.getItem("darkmode");

    if (darkmode && darkmode === "true") return true;
    else if ((darkmode && darkmode === "false") || darkmode === null)
      return false;
  };

  triggerDarkmode = (isDark) => {
    if (isDark) {
      this.elements.forEach((el) => {
        el.classList.add(`${el.classList[0]}--dark`);
      });
      document.body.style.backgroundColor = "rgb(56, 56, 56)";
    } else {
      this.elements.forEach((el) => {
        el.classList.remove(`${el.classList[0]}--dark`);
      });
      document.body.style.backgroundColor = "";
    }
  };
}

export default Darkmode;
