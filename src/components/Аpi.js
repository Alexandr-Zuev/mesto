export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(this._getResponseData)
      .catch(error => Promise.reject(`Ошибка при получении карточек: ${error}`));
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._getResponseData)
      .catch(error => Promise.reject(`Ошибка при редактировании профиля: ${error}`));
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(this._getResponseData)
      .catch(error => Promise.reject(`Ошибка при добавлении новой карточки: ${error}`));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(this._getResponseData)
      .catch(error => Promise.reject(`Ошибка при удалении карточки: ${error}`));
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(this._getResponseData)
      .catch(error => {
        Promise.reject(`Ошибка при лайке карточки: ${error}`);
      });
  }

  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(this._getResponseData)
      .catch(error => {
        return Promise.reject(`Ошибка при снятии лайка с карточки: ${error}`); //
      });
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatarUrl })
    })
      .then(this._getResponseData)
      .catch(error => Promise.reject(`Ошибка при обновлении аватара: ${error}`));
  }
}
