import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = document.querySelector('#add-form');
    this.nameInputCardEl = this._formElement.querySelector('#name-input-card');
    this.nameInputLinkEl = this._formElement.querySelector('#name-input-link');
    this._submitButton = this._formElement.querySelector('.popup__button');
  }

  _getInputValues() {
    const item = {
      name: this.nameInputCardEl.value,
      link: this.nameInputLinkEl.value
    };

    return item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
