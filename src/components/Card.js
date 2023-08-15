export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteConfirm,
    userId,
    handlelikeCard,
    handleunlikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._currentUserId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlelikeCard = handlelikeCard;
    this._handleunlikeCard = handleunlikeCard;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._likesCount = data.likes.length;
    this._userId = userId;
  }

  isOwnedByCurrentUser() {
    return this._userId !== this._currentUserId;
  }

  deleteCard(cardElement) {
    cardElement.remove();
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
    this._element.querySelector('.like-button_count').textContent = this._likesCount;
    this._setEventListeners();
    if (this.isOwnedByCurrentUser()) {
      const deleteButton = this._element.querySelector('.delete-button');
      deleteButton.remove();
    }
    return this._element;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.like-button');
    this._likeButton.addEventListener('click', () => {
      const isLiked = !this._likeButton.classList.contains('like-button_status-active');
      if (isLiked) {
        this._handlelikeCard(this._element);
      } else {
        this._handleunlikeCard(this._element);
      }
      this._updateLikesCount(isLiked);
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
