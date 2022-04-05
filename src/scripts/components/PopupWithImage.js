import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };
  openPopup(text, link) {
    const caption = this._popup.querySelector('.popup__caption');
    const image = document.querySelector('.popup__image');
    caption.textContent = text;
    image.alt = text;
    image.src = link;
    super.openPopup();
  }
}