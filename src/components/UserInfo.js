export class UserInfo {
  constructor(nameElementSelector, aboutElementSelector, avatarElementSelector) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._aboutElement = document.querySelector(aboutElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }

  setAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
