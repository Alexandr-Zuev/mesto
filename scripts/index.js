import {
  items,
  config,
  openPopupProfileEl,
  editPopupEl,
  profileTitleEl,
  profileSubTitleEl,
  nameInputTitleEl,
  nameInputSubTitleEl,
  editFormEl,
  closePopupButtons,
  elementsEl,
  addButtonEl,
  addPopupEl,
  addFormEl,
  nameInputCardEl,
  nameInputLinkEl,
  formList,
  popupList,
  popupCardEl,
  formValidators
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

const CardSection = new Section(
  {
    items: items,
    renderer: item => {
      const cardElement = createCard(item);
      CardSection.addItem(cardElement);
    }
  },
  elementsEl
);
CardSection.renderItems();

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
