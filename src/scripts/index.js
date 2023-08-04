import '../pages/index.css';
import {
  items,
  config,
  openPopupProfileEl,
  elementsEl,
  addButtonEl,
  formList,
  formValidators
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const cardSection = new Section(
  {
    items: items,
    renderer: item => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    }
  },
  elementsEl
);
cardSection.renderItems();

formList.forEach(formElement => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

function createCard(item) {
  const card = new Card(item, '#template-element', handleCardClick);
  return card.generateCard();
}

function handleCardClick(imageSrc, imageCaption) {
  imagePopup.open(imageSrc, imageCaption);
}

const addPopup = new PopupWithForm('#popup-add-element', () => {
  const data = addPopup.getInputValues();
  const item = {
    name: data['name-input-card'],
    link: data['name-input-link']
  };
  const cardElement = createCard(item);
  elementsEl.prepend(cardElement);
});
addPopup.setEventListeners();

const imagePopup = new PopupWithImage('#popupCard');
imagePopup.setEventListeners();

const userInfoPopup = new PopupWithForm('#popup-edit-profile', () => {
  const receivedUserInfo = userInfoPopup.getInputValues();
  userInfo.setUserInfo(receivedUserInfo);
});

userInfoPopup.setEventListeners();

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

openPopupProfileEl.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues(currentUserInfo);
  userInfoPopup.open();
});

addButtonEl.addEventListener('click', function () {
  const addFormValidator = formValidators.find(validator => validator._name === 'add-form');
  addFormValidator.resetValidation();
  addPopup.open();
});
