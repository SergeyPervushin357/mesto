import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, titleButton, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._titleButton = titleButton;
    this._titleDefault = this._buttonConfirm.textContent;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener('click', () => {
      this.changingTextSubmission(true);
      this._handleSubmit();
    })
  }

  changingTextSubmission(load) {
    if (load) {
      this._buttonConfirm.textContent = this._titleButton;
      this._buttonConfirm.setAttribute('disabled', 'true');
    } else {
      this._buttonConfirm.textContent = this._titleDefault;
      
    }
  }
}