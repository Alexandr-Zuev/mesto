import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this.confirmButton = this._popup.querySelector('.popup__button');
  }

  open(cardElement, card) {
    super.open();
    this._cardElement = cardElement;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this.confirmButton.addEventListener('click', () => {
      this._submitCallback(this._cardElement, this._card);
    });
  }
}
