import {
  items,
  config,
  openPopupProfileEl,
  editFormEl,
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

function createCard(item) {
  const card = new Card(item, '#template-element', handleCardClick);
  return card.generateCard();
}

function handleCardClick(imageSrc, imageCaption) {
  const imagePopup = new PopupWithImage('#popupCard');
  imagePopup.open(imageSrc, imageCaption);
  imagePopup.setEventListeners();
}

const userInfoPopup = new UserInfo('#popup-edit-profile', {
  nameElementSelector: '.profile__title',
  aboutElementSelector: '.profile__subtitle'
});

openPopupProfileEl.addEventListener('click', function () {
  const currentUserInfo = userInfoPopup.getUserInfo();
  console.log(currentUserInfo);
  userInfoPopup.open(currentUserInfo);
  userInfoPopup.setEventListeners();
});

editFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const newUserInfo = userInfoPopup.getUserInfo();
  userInfoPopup.setUserInfo(newUserInfo);
  userInfoPopup.close();
});


addButtonEl.addEventListener('click', function () {
  const addFormValidator = formValidators.find(validator => validator._name === 'add-form');
  addFormValidator.resetValidation();
  const addPopup = new PopupWithForm('#popup-add-element', item => {
    const cardElement = createCard(item);
    elementsEl.prepend(cardElement);
  });
  addPopup.open();
  addPopup.setEventListeners();
});
