import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { item, config } from './data.js';

const openPopupProfileEl = document.querySelector('#open-popup-profile-button');
const editPopupEl = document.querySelector('#popup-edit-profile');
const profileTitleEl = document.querySelector('.profile__title');
const profileSubTitleEl = document.querySelector('.profile__subtitle');
const nameInputTitleEl = document.querySelector('#name-input-title');
const nameInputSubTitleEl = document.querySelector('#name-input-subtitle');
const editFormEl = document.querySelector('#edit-form');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const elementsEl = document.querySelector('.elements');
const addButtonEl = document.querySelector('#add-button');
const addPopupEl = document.querySelector('#popup-add-element');
const addFormEl = document.querySelector('#add-form');
const nameInputCardEl = document.querySelector('#name-input-card');
const nameInputLinkEl = document.querySelector('#name-input-link');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupCardEl = document.querySelector('#popupCard');
const formValidators = [];

item.forEach(item => {
  const cardElement = createCard(item);
  elementsEl.append(cardElement);
});

formList.forEach(formElement => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

popupList.forEach(popup => {
  popup.addEventListener('mouseup', event => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

closePopupButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function createCard(item) {
  const card = new Card(item, '#template-element', popupCardEl, openPopup, closePopup);
  return card.generateCard();
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyDownListener);
}

function openPopup(popupEl) {
  popupEl.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyDownListener);
}

const keyDownListener = function (event) {
  if (event.key === 'Escape') {
    const openPopupEl = document.querySelector('.popup_is-opened');
    if (openPopupEl) {
      closePopup(openPopupEl);
    }
  }
};

openPopupProfileEl.addEventListener('click', function () {
  openPopup(editPopupEl);
  nameInputTitleEl.value = profileTitleEl.textContent;
  nameInputSubTitleEl.value = profileSubTitleEl.textContent;
});

editFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  closePopup(editPopupEl);
  profileTitleEl.textContent = nameInputTitleEl.value;
  profileSubTitleEl.textContent = nameInputSubTitleEl.value;
});

addButtonEl.addEventListener('click', function () {
  const addFormValidator = formValidators.find(validator => validator._name === 'add-form');
  addFormEl.reset();
  addFormValidator.resetValidation();
  openPopup(addPopupEl);
});

addFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const item = {
    name: nameInputCardEl.value,
    link: nameInputLinkEl.value
  };
  const cardElement = createCard(item);
  elementsEl.prepend(cardElement);
  addFormEl.reset();
  closePopup(addPopupEl);
});
