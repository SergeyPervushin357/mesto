import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = document.querySelector('.popup__caption');
    this._image = document.querySelector('.popup__image');
  };

  openPopup(text, link) {
    this._caption.textContent = text;
    this._image.alt = text;
    this._image.src = link;
    super.openPopup();
  }
}