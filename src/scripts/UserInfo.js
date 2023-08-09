export class UserInfo {
  constructor(nameElementSelector, aboutElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }
}
