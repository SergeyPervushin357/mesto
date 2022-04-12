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

  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name]
    })
  }

  openPopup() {
    super.openPopup();
    if (this._buttonConfirm.disabled) {
      this._buttonConfirm.removeAttribute('disabled');
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      this.changingTextSubmission(true);
      event.preventDefault();
      this._handleSubmit(this._getInputValues())
      .then(() => this.closePopup())
      .catch((err) => {
        err.then((res) => {
          alert(res.message)
        })
      })
      .finally(() => this.changingTextSubmission(false))
  });
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
};