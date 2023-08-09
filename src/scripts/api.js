export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  likeCard() {
    fetch(`${this.baseUrl}/cards/${this._cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(response => response.json())
      .then(updatedCard => {
        this._updateLikes(updatedCard.likes);
      })
      .catch(error => {
        console.error('Ошибка при лайке карточки:', error);
      });
  }

  unlikeCard() {
    fetch(`${this.baseUrl}/cards/${this._cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(response => response.json())
      .then(updatedCard => {
        this._updateLikes(updatedCard.likes);
      })
      .catch(error => {
        console.error('Ошибка при снятии лайка с карточки:', error);
      });
  }
}
