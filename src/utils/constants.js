const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editaVaPopupEl = document.querySelector('.profile__avatar-icon-up');
const openPopupProfileEl = document.querySelector('#open-popup-profile-button');
const editPopupEl = document.querySelector('#popup-edit-profile');
const elementsEl = document.querySelector('.elements');
const addButtonEl = document.querySelector('#add-button');
const addPopupEl = document.querySelector('#popup-add-element');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupCardEl = document.querySelector('#popupCard');
const formValidators = [];

export {
  config,
  editaVaPopupEl,
  openPopupProfileEl,
  editPopupEl,
  elementsEl,
  addButtonEl,
  addPopupEl,
  formList,
  popupList,
  popupCardEl,
  formValidators
};
