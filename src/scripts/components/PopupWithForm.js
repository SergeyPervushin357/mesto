import { Popup } from '../components/Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, titleButton) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._titleButton = titleButton;
    this._titleDefault = this._buttonConfirm.textContent;
    this._inputs = [...this._form.querySelectorAll('.popup__text')];
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      this.changingTextSubmission(true);
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
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