const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

export {
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
};
