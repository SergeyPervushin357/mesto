import { Popup } from '../components/Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._buttunSubmit = this._form.querySelector('.popup__save');
    this._textDefault = this._buttunSubmit.textContent;
    this._inputs = [...this._form.querySelectorAll('.popup__text')];
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
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
      this._buttunSubmit.textContent = 'Сохранение...';
    } else {
      this._buttunSubmit.textContent = this._textDefault;
    }
  }

}