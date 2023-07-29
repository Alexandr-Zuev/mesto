import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__title-image');
  }

  open(imageCaption, imageSrc) {
    super.open();
    this._popupImage.alt = imageCaption;
    this._popupImage.src = imageSrc;
    this._popupCaption.textContent = imageCaption;
  }
}
