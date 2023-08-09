import { Api } from './api.js';

import {
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
import { PopupWithConfirm } from './PopupWithConfirm.js';
import { UserInfo } from './UserInfo.js';

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '04403901-3989-4ba9-8f9f-578d2bb85149',
    'Content-Type': 'application/json'
  }
});

// добавление инфо профиля с сервера
async function fetchgetUserInfo() {
  try {
    return await api.getUserInfo();
  } catch (err) {
    console.error(err);
  }
}
const fetchUserInfo = await fetchgetUserInfo();
userInfo.setUserInfo(fetchUserInfo);
const userId = fetchUserInfo._id;

// Добавляем карточки с сервера
async function fetchInitialCards() {
  try {
    return await api.getInitialCards();
  } catch (err) {
    console.error(err);
    return [];
  }
}

const items = await fetchInitialCards();
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
//

formList.forEach(formElement => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

function createCard(item) {
  const card = new Card(item, '#template-element', handleCardClick, handleDeleteConfirm, userId);
  const cardElement = card.generateCard();
  cardElement.setAttribute('card-id', item._id);
  return cardElement;
}

function handleCardClick(imageSrc, imageCaption) {
  imagePopup.open(imageSrc, imageCaption);
}

function handleDeleteConfirm(cardElement) {
  const cardId = cardElement.getAttribute('card-id');
  const confirmPopup = new PopupWithConfirm('#popup-confirm', () => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
      });
  });
  confirmPopup.open();
  confirmPopup.setEventListeners();
}

const addPopup = new PopupWithForm('#popup-add-element', () => {
  const data = addPopup.getInputValues();
  const item = {
    name: data['name'],
    link: data['about']
  };

  api
    .addNewCard(item)
    .then(card => {
      const cardElement = createCard(card);
      elementsEl.prepend(cardElement);
      addPopup.close();
    })
    .catch(error => {
      console.error('Ошибка при добавлении новой карточки:', error);
    });
});

addPopup.setEventListeners();

const imagePopup = new PopupWithImage('#popupCard');
imagePopup.setEventListeners();

const userInfoPopup = new PopupWithForm('#popup-edit-profile', () => {
  const receivedUserInfo = userInfoPopup.getInputValues();
  api
    .editProfile(receivedUserInfo)
    .then(updatedUser => {
      userInfo.setUserInfo(updatedUser);
      userInfoPopup.close();
    })
    .catch(error => {
      console.error('Ошибка при обновлении профиля:', error);
    });
});

userInfoPopup.setEventListeners();

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
