export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__img').src = this._link;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.like-button').addEventListener('click', () => {
      const likeButton = this._element.querySelector('.like-button');
      likeButton.classList.toggle('like-button_status-active');
    });

    this._element.querySelector('.delete-button').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
