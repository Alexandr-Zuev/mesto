import { Popup } from './Popup.js';

export class UserInfo extends Popup {
  constructor(popupSelector, { nameElementSelector, aboutElementSelector }) {
    super(popupSelector);
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
    this._nameInputTitleEl = this._popup.querySelector('#name-input-title');
    this._nameInputSubTitleEl = this._popup.querySelector('#name-input-subtitle');
  }

  open(userInfo) {
    super.open();
    this._displayUserInfo(userInfo);
  }

  _displayUserInfo(userInfo) {
    this._nameInputTitleEl.value = userInfo.name;
    this._nameInputSubTitleEl.value = userInfo.about;
    
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo() {
    this._nameElement.textContent = this._nameInputTitleEl.value;
    this._aboutElement.textContent = this._nameInputSubTitleEl.value;
  }
}