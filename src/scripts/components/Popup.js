export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  openPopup() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_open');
  }

  closePopup() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (!e.target.closest('popup__block') || e.target.classList.contains('popup__closed')) {
        this.closePopup();
      }
    })
  }
}