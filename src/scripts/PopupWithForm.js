import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButton = this._formElement.querySelector('.popup__button'); 
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._submitCallback();
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  getInputValues() {
    const item = {};
    this._inputList.forEach(input => {
      item[input.name] = input.value;
    });
    return item;
  }

  setInputValues(item) {
    this._inputList.forEach(input => {
      input.value = item[input.name];
    });
  }
}