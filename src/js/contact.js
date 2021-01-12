import "../sass/contact.scss";
import "./darkmode/darkmode";

const TOOLTIPS = [
  "Wiadomośc wysłana. Odpowiemy tak szybko jak to możliwe :)",
  "Uupppsss... coś poszło nie tak. Spróbuj ponownie za chwilę lub wybierz inną formę kontaktu",
  "Wiadomość niewysłana. Wypełnij poprawnie wymagane pola formularza i spróbuj ponownie. <i class='fas fa-exclamation description-container__icon'></i>",
];

(function () {
  emailjs.init("user_DoPr8V6rNQ5LKJADjzG7E");
})();

const resetBtn = document.getElementById("reset-btn");

const formFields = [
  document.getElementById("from_name"),
  document.getElementById("reply_to"),
  document.getElementById("message"),
  document.getElementById("tel"),
];

const tooltips = [
  document.querySelector("[data-key='field-1']"),
  document.querySelector("[data-key='field-2']"),
  document.querySelector("[data-key='field-3']"),
  document.querySelector("[data-key='field-4']"),
];

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(\d\s*){9,}/;

function sendEmail(e) {
  const [name, email, message, tel] = formFields;
  const tooltip = document.querySelector(".description-container__info");
  e.preventDefault();

  if (validateFields().validation) {
    const serviceID = "default_service";
    const templateID = "template_412jnzc";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        tooltip.innerHTML = TOOLTIPS[0];
        tooltip.style.transform = "translateX(0)";

        setTimeout(() => {
          tooltip.style.transform = "translateX(-100vw)";
        }, 6000);
      },
      () => {
        tooltip.innerHTML = TOOLTIPS[1];
        tooltip.style.transform = "translateX(0)";
        setTimeout(() => {
          tooltip.style.transform = "translateX(-100vw)";
        }, 7500);
      }
    );

    resetForm();
  } else {
    tooltip.innerHTML = TOOLTIPS[2];
    tooltip.style.transform = "translateX(0)";

    if (!validateFields().name && name.value.length === 0) {
      name.classList.add("form__input--invalid");
      setTimeout(() => {
        name.classList.remove("form__input--invalid");
      }, 5000);
    }
    if (!validateFields().email && email.value.length === 0) {
      email.classList.add("form__input--invalid");
      setTimeout(() => {
        email.classList.remove("form__input--invalid");
      }, 5000);
    }
    if (!validateFields().tel && tel.value.length === 0) {
      tel.classList.add("form__input--invalid");
      setTimeout(() => {
        tel.classList.remove("form__input--invalid");
      }, 5000);
    }
    if (!validateFields().message && message.value.length === 0) {
      message.classList.add("form__input--invalid");
      setTimeout(() => {
        message.classList.remove("form__input--invalid");
      }, 5000);
    }

    setTimeout(() => {
      tooltip.style.transform = "translateX(-100vw)";
    }, 5000);
  }
}

const validateFields = () => {
  const [name, email, message, tel] = formFields;

  const validation = {
    validation: true,
    name: true,
    email: true,
    message: true,
    tel: true,
  };

  if (name.value === "" || name.value.length < 2) {
    validation.name = false;
    validation.validation = false;
  }
  if (email.value === "" || !email.value.match(emailRegex)) {
    validation.email = false;
    validation.validation = false;
  }
  if (message.value === "" || message.value.length < 10) {
    validation.message = false;
    validation.validation = false;
  }
  if (tel.value !== "" && !tel.value.match(phoneRegex)) {
    validation.tel = false;
    validation.validation = false;
  }

  return validation;
};

const displayTooltip = (e) => {
  const invalid = "form__input--invalid";
  const valid = "form__input--valid";
  const [name, email, message, tel] = formFields;
  const [nameTooltip, emailToolTip, phoneTooltip, messageTooltip] = tooltips;

  e.target.classList.remove(invalid, valid);

  if (e.target.name === "from_name") {
    if (e.target.value === "") {
      nameTooltip.textContent = "Pole nie może być puste.";
      name.classList.add(invalid);
    } else if (e.target.value.length < 2) {
      nameTooltip.textContent = "Pole musi zawierać co najmniej 2 znaki";
      name.classList.add(invalid);
    } else {
      nameTooltip.textContent = "";
      name.classList.add(valid);
    }
  } else if (e.target.name === "reply_to") {
    if (e.target.value === "") {
      emailToolTip.textContent = "Pole nie może być puste.";
      email.classList.add(invalid);
    } else if (!e.target.value.match(emailRegex)) {
      emailToolTip.textContent = "Niepoprawny adres email.";
      email.classList.add(invalid);
    } else {
      emailToolTip.textContent = "";
      email.classList.add(valid);
    }
  } else if (e.target.name === "tel") {
    if (e.target.value === "") {
      phoneTooltip.textContent = "";
    } else if (!e.target.value.match(phoneRegex)) {
      phoneTooltip.textContent = "Niepoprawny numer telefonu";
      tel.classList.add(invalid);
    } else {
      phoneTooltip.textContent = "";
      tel.classList.add(valid);
    }
  } else if (e.target.name === "message") {
    if (e.target.value === "") {
      messageTooltip.textContent = "Pole nie może być puste.";
      message.classList.add(invalid);
    } else if (e.target.value.length < 10) {
      messageTooltip.textContent =
        "Wiadomość musi zawierać co najmniej 10 znaków.";
      message.classList.add(invalid);
    } else {
      messageTooltip.textContent = "";
      message.classList.add(valid);
    }
  }
};

const resetForm = () => {
  formFields.forEach((field) => {
    field.value = "";
    field.classList.remove("form__input--invalid", "form__input--valid");
  });

  tooltips.forEach((tooltip) => {
    tooltip.innerHTML = "";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", displayTooltip);
  });

  resetBtn.addEventListener("click", resetForm);

  document.querySelector("textarea").addEventListener("blur", displayTooltip);
});

document.getElementById("form").addEventListener("submit", sendEmail);
