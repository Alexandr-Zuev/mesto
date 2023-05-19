const openPopupButtonEl = document.querySelector('#open-popup-button');
const closePopupButtonEl = document.querySelector('#close-popup-button');
const editPopupEl = document.querySelector('#popup');
const profileTitleEl = document.querySelector('.profile__title');
const profileSubTitleEl = document.querySelector('.profile__subtitle');
const nameInputTitleEl = document.querySelector('#name-input-title');
const nameInputSubTitleEl = document.querySelector('#name-input-subtitle');
const editFormEl = document.querySelector('#edit-form');

openPopupButtonEl.addEventListener('click', function () {
    openPopup(editPopupEl);
  });

  function openPopup(popupEl) {
    popupEl.classList.add('popup_is-opened');
  }

closePopupButtonEl.addEventListener('click', function () {
    closePopup(editPopupEl);
  });
  
  function closePopup(popupEl) {
    popupEl.classList.remove('popup_is-opened');
  }
  
  nameInputTitleEl.value = profileTitleEl.textContent;
  nameInputSubTitleEl.value = profileSubTitleEl.textContent;
 
  
  editFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
  
  profileTitleEl.textContent = nameInputTitleEl.value;
  profileSubTitleEl.textContent = nameInputSubTitleEl.value;
  
    closePopup(editPopupEl);
  });

  const buttonsLike = document.querySelectorAll('.like-button');
  let isImageChanged = false;
  buttonsLike.forEach(function(button) {
    button.addEventListener('click', function() {
      if (isImageChanged) {
        button.style.backgroundImage = "url('../../images/likeButton.svg')";
        isImageChanged = false;
      } else {
        button.style.backgroundImage = "url('../../images/likeButton_active.svg')";
        isImageChanged = true;
      }
    });
  });
  
  

  
  
