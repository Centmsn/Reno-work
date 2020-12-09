class Darkmode {
  toggleDarkmode = () => {
    if (this.getMode()) {
      localStorage.setItem("darkmode", "false");
    } else {
      localStorage.setItem("darkmode", "true");
    }
  };

  getMode = () => {
    const darkmode = localStorage.getItem("darkmode");

    if (darkmode && darkmode === "true") return true;
    else if ((darkmode && darkmode === "false") || darkmode === null)
      return false;
  };
}

export default Darkmode;
