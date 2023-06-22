const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};

const setEventListeners = (formElement, formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObj);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);
    });
    inputElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter' && !inputElement.validity.valid) {
        evt.preventDefault();
      }
    });
  });
};

function enableValidation(formObj) {
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    setEventListeners(formElement, formObj);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function disableSubmitButton(buttonElement) {
  buttonElement.classList.add('popup__button_disabled');
}
