import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const item = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const openPopupProfileEl = document.querySelector("#open-popup-profile-button");
const editPopupEl = document.querySelector("#popup-edit-profile");
const profileTitleEl = document.querySelector(".profile__title");
const profileSubTitleEl = document.querySelector(".profile__subtitle");
const nameInputTitleEl = document.querySelector("#name-input-title");
const nameInputSubTitleEl = document.querySelector("#name-input-subtitle");
const editFormEl = document.querySelector("#edit-form");
const closePopupButtons = document.querySelectorAll(".popup__close-button");
const elementsEl = document.querySelector(".elements");
const addButtonEl = document.querySelector("#add-button");
const addPopupEl = document.querySelector("#popup-add-element");
const addFormEl = document.querySelector("#add-form");
const nameInputCardEl = document.querySelector("#name-input-card");
const nameInputLinkEl = document.querySelector("#name-input-link");
const formList = Array.from(document.querySelectorAll(".popup__form"));

item.forEach((item) => {
  const card = new Card(item, "#template-element");
  const cardElement = card.generateCard();
  elementsEl.append(cardElement);
});

formList.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
});

closePopupButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

function closePopup(popupEl) {
  popupEl.classList.remove("popup_is-opened");
  popupEl.removeEventListener("click", clickListener);
  document.removeEventListener("keydown", keyDownListener);
}

function openPopup(popupEl) {
  popupEl.classList.add("popup_is-opened");
  popupEl.addEventListener("click", clickListener);
  document.addEventListener("keydown", keyDownListener);
}

const clickListener = function (event) {
  if (event.target === event.currentTarget) {
    const openPopupEl = document.querySelector(".popup_is-opened");
    if (openPopupEl) {
      closePopup(openPopupEl);
    }
  }
};

const keyDownListener = function (event) {
  if (event.key === "Escape") {
    const openPopupEl = document.querySelector(".popup_is-opened");
    if (openPopupEl) {
      closePopup(openPopupEl);
    }
  }
};

openPopupProfileEl.addEventListener("click", function () {
  openPopup(editPopupEl);
  nameInputTitleEl.value = profileTitleEl.textContent;
  nameInputSubTitleEl.value = profileSubTitleEl.textContent;
});

editFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  closePopup(editPopupEl);
  profileTitleEl.textContent = nameInputTitleEl.value;
  profileSubTitleEl.textContent = nameInputSubTitleEl.value;
});

addButtonEl.addEventListener("click", function () {
  const buttonElement = addFormEl.querySelector(".popup__button");
  buttonElement.classList.add("popup__button_disabled");
  addFormEl.reset();
  openPopup(addPopupEl);
});

addFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  const item = {
    name: nameInputCardEl.value,
    link: nameInputLinkEl.value,
  };
  const card = new Card(item, "#template-element");
  const cardElement = card.generateCard();
  elementsEl.prepend(cardElement);
  addFormEl.reset();
  closePopup(addPopupEl);
});
