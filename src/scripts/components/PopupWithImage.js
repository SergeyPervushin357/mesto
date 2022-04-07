import { Popup } from "./Popup.js";
import { caption, image } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };
  openPopup(text, link) {
    caption.textContent = text;
    image.alt = text;
    image.src = link;
    super.openPopup();
  }
}