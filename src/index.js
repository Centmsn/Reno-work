import "./sass/homepage.scss";

import "./js/tools/carousel.js";
import "./js/tools/videoVisibility.js";
import "./js/tools/backtotop.js";
import "./js/tools/homeDescription.js";

import ELEMENTS from "./js/darkmode/elements";
import Darkmode from "./js/darkmode/darkmode";

new Darkmode([...ELEMENTS.HOME, ...ELEMENTS.DEFAULTS]);
