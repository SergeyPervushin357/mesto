import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  openPopup(text, link) {
  const caption = this.popup.querySelector('.popup__caption');
  const image = document.querySelector('.popup__form_image');
  caption.textContent = text;
  image.src = link;
  super.openPopup()
}
}