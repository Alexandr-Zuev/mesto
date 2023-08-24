export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteConfirm,
    userId,
    handleLikeCard,
    handleUnlikeCard
  ) {
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._name = data.name;
    this._link = data.link;
    this._currentUserId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
  }

  isOwnedByCurrentUser() {
    return this._userId === this._currentUserId;
  }

  deleteCard() {
    this._element.remove();
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
    this.likeCountElement = this._element.querySelector('.like-button_count');
    this.likeCountElement.textContent = this._likes.length; // Обновление количества лайков
    this.likeButton = this._element.querySelector('.like-button');
    this._setEventListeners();

    if (!this.isOwnedByCurrentUser()) {
      const deleteButton = this._element.querySelector('.delete-button');
      deleteButton.remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      const isLiked = !this.likeButton.classList.contains('like-button_status-active');
      if (isLiked) {
        this._handleLikeCard();
      } else {
        this._handleUnlikeCard();
      }
    });

    this._element.querySelector('.delete-button').addEventListener('click', () => {
      this._handleDeleteConfirm();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  updateLikeButton(response) {
    this.likeCountElement.textContent = response.length;
    this.likeButton.classList.toggle('like-button_status-active');
  }

  deactivateLikeButton() {
    this.likeButton.disabled = true;
  }

  activateLikeButton() {
    this.likeButton.disabled = false;
  }
}
