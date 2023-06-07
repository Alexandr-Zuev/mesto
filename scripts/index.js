const initialCards = [
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
const closePopupButtonsEl = document.querySelectorAll('.popup__close-button');

// Закрытие всех попапов по кнопке
closePopupButtonsEl.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popupEl) {
  popupEl.classList.add('popup_is-opened');
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_is-opened');
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

const template = document.querySelector('#template-element');
const templateContent = template.content;
const elementItemEl = templateContent.querySelector('.element');
const elementsEl = document.querySelector('.elements');

initialCards.forEach(function (item) {
  const newElement = createElement(item);
  elementsEl.prepend(newElement);
});

function createElement(initialCards) {
  const newElement = elementItemEl.cloneNode(true);
  const textCard = newElement.querySelector('.element__text');
  const imageCard = newElement.querySelector('.element__img');
  const popupCard = document.querySelector('#popupCard');
  const popupImage = popupCard.querySelector('.popup__image');
  const popupTitleImg = popupCard.querySelector('.popup__title-image');

  textCard.textContent = initialCards.name;
  imageCard.src = initialCards.link;
  imageCard.alt = initialCards.name;

  const deleteButton = newElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function () {
    elementsEl.removeChild(newElement);
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
const addButtonEl = document.querySelector('#add-button');
const addPopupEl = document.querySelector('#popup-add-element');
const addFormEl = document.querySelector('#add-form');
const nameInputCardEl = document.querySelector('#name-input-card');
const nameInputLinkEl = document.querySelector('#name-input-link');

addButtonEl.addEventListener('click', function () {
  openPopup(addPopupEl);
});

addFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const newElement = createElementFromForm();
  elementsEl.prepend(newElement);
  addFormEl.reset();
  closePopup(addPopupEl);
});

function createElementFromForm() {
  const newElement = elementItemEl.cloneNode(true);
  const textCard = newElement.querySelector('.element__text');
  const imageCard = newElement.querySelector('.element__img');
  const popupImage = popupCard.querySelector('.popup__image');
  const popupTitleImg = popupCard.querySelector('.popup__title-image');
  textCard.textContent = nameInputCardEl.value;
  imageCard.src = nameInputLinkEl.value;
  imageCard.alt = nameInputCardEl.value;

  const deleteButton = newElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function () {
    elementsEl.removeChild(newElement);
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
