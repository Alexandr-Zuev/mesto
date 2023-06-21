const item = [
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
// Попап "section profile"

const openPopupProfileEl = document.querySelector('#open-popup-profile-button');
const editPopupEl = document.querySelector('#popup-edit-profile');
const profileTitleEl = document.querySelector('.profile__title');
const profileSubTitleEl = document.querySelector('.profile__subtitle');
const nameInputTitleEl = document.querySelector('#name-input-title');
const nameInputSubTitleEl = document.querySelector('#name-input-subtitle');
const editFormEl = document.querySelector('#edit-form');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const template = document.querySelector('#template-element');
const templateContent = template.content;
const elementItemEl = templateContent.querySelector('.element');
const elementsEl = document.querySelector('.elements');
const popupCard = document.querySelector('#popupCard');
const popupImage = popupCard.querySelector('.popup__image');
const popupTitleImg = popupCard.querySelector('.popup__title-image');
const addButtonEl = document.querySelector('#add-button');
const addPopupEl = document.querySelector('#popup-add-element');
const addFormEl = document.querySelector('#add-form');
const nameInputCardEl = document.querySelector('#name-input-card');
const nameInputLinkEl = document.querySelector('#name-input-link');
const popups = document.querySelectorAll('.popup');

// Закрытие всех попапов по кнопке
closePopupButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popupEl) {
  popupEl.classList.add('popup_is-opened');

  const clickListener = function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popupEl);
    }
  };
  popupEl.addEventListener('click', clickListener);

  const keyDownListener = function (event) {
    if (event.key === 'Escape') {
      closePopup(popupEl);
    }
  };
  document.addEventListener('keydown', keyDownListener);
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyDownListener);
  popupEl.removeEventListener('click', clickListener);
}

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

// Добавление  и удаление initialCards в elements

item.forEach(function (item) {
  const newElement = createElement(item);
  elementsEl.prepend(newElement);
});

function createElement(item) {
  const newElement = elementItemEl.cloneNode(true);
  const textCard = newElement.querySelector('.element__text');
  const imageCard = newElement.querySelector('.element__img');

  textCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  const deleteButton = newElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function () {
    newElement.remove();
  });

  const likeButton = newElement.querySelector('.like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('like-button_status-active');
  });

  imageCard.addEventListener('click', function () {
    openPopup(popupCard);
    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupTitleImg.textContent = textCard.textContent;
  });

  return newElement;
}

// Попап "section elements"

addButtonEl.addEventListener('click', function () {
  addFormEl.reset();
  disableSubmitButton();
  openPopup(addPopupEl);
});

addFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const item = {
    name: nameInputCardEl.value,
    link: nameInputLinkEl.value
  };
  const newElement = createElement(item);
  elementsEl.prepend(newElement);
  addFormEl.reset();
  closePopup(addPopupEl);
});
