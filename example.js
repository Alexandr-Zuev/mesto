const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector('.popup__error');

const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
};

const hideInputError = element => {
  element.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__error_visible');
  // Очистим ошибку
  formError.textContent = '';
};

const isValid = () => {
  if (!formInput.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};

formInput.addEventListener('input', isValid);

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();
