export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
        const popupEl = document.querySelector("#popupCard");
        const popupImage = popupEl.querySelector(".popup__image");
        const popupTitleImg = popupEl.querySelector(".popup__title-image");
        popupEl.classList.add("popup_is-opened");
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupTitleImg.textContent = this._name;
        popupEl.addEventListener("click", this._handleOverlayClick);
        document.addEventListener("keydown", this._handleEscClose);
      });
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      const popupEl = document.querySelector("#popupCard");
      popupEl.classList.remove("popup_is-opened");
      popupEl.removeEventListener("click", this._handleOverlayClick);
      document.removeEventListener("keydown", this._handleEscClose);
    }
  };

  _handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      const popupEl = document.querySelector("#popupCard");
      popupEl.classList.remove("popup_is-opened");
      popupEl.removeEventListener("click", this._handleOverlayClick);
      document.removeEventListener("keydown", this._handleEscClose);
    }
  };
}
