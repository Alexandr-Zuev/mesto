export class UserInfo {
  constructor(nameElementSelector, aboutElementSelector ) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
   
  }

  getUserInfo() {
    return {
      'name-input-title': this._nameElement.textContent,
      'name-input-subtitle': this._aboutElement.textContent
    }
  }

  setUserInfo(data) {
    this._nameElement.textContent = data['name-input-title'];
    this._aboutElement.textContent = data['name-input-subtitle'];
  }
}