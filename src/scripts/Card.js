export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteConfirm, userId) {
    this._name = data.name;
    this._link = data.link;
    this._currentUserId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._likesCount = data.likes.length;
    this._userId = userId;
  }

  isOwnedByCurrentUser() {
    return this._userId !== this._currentUserId;
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

    if (this.isOwnedByCurrentUser()) {
      const deleteButton = this._element.querySelector('.delete-button');
      deleteButton.remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.like-button').addEventListener('click', () => {
      const likeButton = this._element.querySelector('.like-button');
      likeButton.classList.toggle('like-button_status-active');
      this._updateLikesCount(likeButton.classList.contains('like-button_status-active'));
    });

    this._element.querySelector('.delete-button').addEventListener('click', () => {
      this._handleDeleteConfirm(this._element);
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _updateLikesCount(isLiked) {
    const likeCountElement = this._element.querySelector('.like-button_count');
    this._likesCount = isLiked ? this._likesCount + 1 : this._likesCount - 1;
    likeCountElement.textContent = this._likesCount;
  }
}
