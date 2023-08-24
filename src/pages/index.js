import '../pages/index.css';
import { Api } from '../components/Аpi.js';
import {
  config,
  openPopupProfileEl,
  elementsEl,
  addButtonEl,
  formList,
  formValidators,
  editaVaPopupEl
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '04403901-3989-4ba9-8f9f-578d2bb85149',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const imagePopup = new PopupWithImage('#popupCard');
imagePopup.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])

  .then(([fetchUserInfo, fetchInitialCards]) => {
    userInfo.setUserInfo(fetchUserInfo);
    userInfo.setAvatar(fetchUserInfo);
    userId = fetchUserInfo._id;
    cardsList.renderItems(fetchInitialCards);
  })
  .catch(err => {
    console.log(err);
  });

let userId;
function createCard(item) {
  const card = new Card(
    item,
    '#template-element',
    handleCardClick,
    handleDeleteConfirm,
    userId,
    handleLikeCard,
    handleUnlikeCard
  );
  const cardElement = card.generateCard();

  function handleDeleteConfirm() {
    confirmPopup.open(item._id, card);
  }

  function handleLikeCard() {
    card.deactivateLikeButton();
    api
      .likeCard(item._id)
      .then(response => {
        card.updateLikeButton(response.likes);
      })
      .catch(err => {
        console.log(`Ошибка при установке лайка карточки: ${err}`);
      })
      .finally(() => {
        card.activateLikeButton();
      });
  }

  function handleUnlikeCard() {
    card.deactivateLikeButton();
    api
      .unlikeCard(item._id)
      .then(response => {
        card.updateLikeButton(response.likes);
      })
      .catch(err => {
        console.log(`Ошибка при снятии лайка с карточки: ${err}`);
      })
      .finally(() => {
        card.activateLikeButton();
      });
  }

  return cardElement;
}

function handleCardClick(imageSrc, imageCaption) {
  imagePopup.open(imageSrc, imageCaption);
}

formList.forEach(formElement => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

const confirmPopup = new PopupWithConfirm('#popup-confirm', (itemId, card) => {
  const submitButton = confirmPopup.confirmButton;
  submitButton.textContent = 'Удаление...';
  submitButton.disabled = true;
  api
    .deleteCard(itemId)
    .then(() => {
      card.deleteCard();
      confirmPopup.close();
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Да';
      submitButton.disabled = false;
    });
});
confirmPopup.setEventListeners();

const cardsList = new Section(
  {
    renderer: item => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  elementsEl
);

const addPopup = new PopupWithForm('#popup-add-element', data => {
  const submitButton = addPopup._formElement.querySelector('.popup__button');
  const item = {
    name: data['name-input-card'],
    link: data['name-input-link']
  };
  submitButton.textContent = 'Создание...';
  submitButton.disabled = true;
  api
    .addNewCard(item)
    .then(card => {
      const cardElement = createCard(card);
      cardsList.addItem(cardElement);
      addPopup.close();
    })
    .catch(err => {
      console.log(`Ошибка при добавлении новой карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
});
addPopup.setEventListeners();

const userInfoPopup = new PopupWithForm('#popup-edit-profile', data => {
  const receivedUserInfo = { name: data['name-input-title'], about: data['name-input-subtitle'] };
  const submitButton = userInfoPopup._formElement.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  api
    .editProfile(receivedUserInfo)
    .then(updatedUser => {
      userInfo.setUserInfo(updatedUser);
      userInfoPopup.close();
    })
    .catch(error => {
      console.error('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
});
userInfoPopup.setEventListeners();

openPopupProfileEl.addEventListener('click', function () {
  const currentUserInfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues('#name-input-title', currentUserInfo.name);
  userInfoPopup.setInputValues('#name-input-subtitle', currentUserInfo.about);
  userInfoPopup.open();
});

const avaPopup = new PopupWithForm('#popup-update-avatar', data => {
  const submitButton = avaPopup._formElement.querySelector('.popup__button');
  const item = {
    link: data['new-avatar-link']
  };
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = false;
  api
    .updateAvatar(item.link)
    .then(data => {
      userInfo.setAvatar(data);
      avaPopup.close();
    })
    .catch(error => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
});
avaPopup.setEventListeners();

editaVaPopupEl.addEventListener('click', function () {
  const avaFormValidator = formValidators.find(validator => validator._name === 'new-avatar-form');
  avaFormValidator.resetValidation();
  avaPopup.open();
});

addButtonEl.addEventListener('click', function () {
  const addFormValidator = formValidators.find(validator => validator._name === 'add-form');
  addFormValidator.resetValidation();
  addPopup.open();
});
