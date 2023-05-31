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
const closePopupProfileEl = document.querySelector('#close-popup-profile-button');
const editPopupEl = document.querySelector('#popup-edit-profile');
const profileTitleEl = document.querySelector('.profile__title');
const profileSubTitleEl = document.querySelector('.profile__subtitle');
const nameInputTitleEl = document.querySelector('#name-input-title');
const nameInputSubTitleEl = document.querySelector('#name-input-subtitle');
const editFormEl = document.querySelector('#edit-form');

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

closePopupProfileEl.addEventListener('click', function () {
  closePopup(editPopupEl);
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
  textCard.textContent = initialCards.name;

  const imageCard = newElement.querySelector('.element__img');
  imageCard.src = initialCards.link;

  const deleteButton = newElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function () {
    elementsEl.removeChild(newElement);
  });

  return newElement;
}

// button "like"
const buttonsLike = document.querySelectorAll('.like-button');
let isImageChanged = false;
buttonsLike.forEach(function (button) {
  button.addEventListener('click', function () {
    if (isImageChanged) {
      button.style.backgroundImage = "url('../../images/likeButton.svg')";
      isImageChanged = false;
    } else {
      button.style.backgroundImage = "url('../../images/likeButton_active.svg')";
      isImageChanged = true;
    }
  });
});

// Попап "section elements"

const openPopupElementsEl = document.querySelector('#add-button');
const closePopupElementsEl = document.querySelector('#close-popup-add-elements-button');

function openPopup(popupEl) {
  popupEl.classList.add('popup_is-opened');
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_is-opened');
}

openPopupProfileEl.addEventListener('click', function () {
  openPopup(editPopupEl);
});

closePopupProfileEl.addEventListener('click', function () {
  closePopup(editPopupEl);
});
