export class Card {
  constructor(data, templateSelector, popupCardEl, openPopup, closePopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupCardEl = popupCardEl;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }
    _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__img").src = this._link;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".like-button")
      .addEventListener("click", () => {
        const likeButton = this._element.querySelector(".like-button");
        likeButton.classList.toggle("like-button_status-active");
      });

    this._element
      .querySelector(".delete-button")
      .addEventListener("click", () => {
        this._element.remove();
      });

    this._element
      .querySelector(".element__img")
      .addEventListener("click", () => {  
        this._openPopup(this._popupCardEl);
        this._popupCardEl.querySelector(".popup__image").src = this._link;
        this._popupCardEl.querySelector(".popup__image").alt = this._name;
        this._popupCardEl.querySelector(".popup__title-image").textContent = this._name;
      });
  }
}
