export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  openPopup() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popupclassList.add('popup_open');
  }

  closePopup() {
    this.popup.classList.remove(this._popup);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose() {
    if (evt.key === 'Escape') {
      this.closePopup();
      console.log(this)
    }
  }
  setEventListeners() {
    const closebuttom = document.querySelector('.popup__closed')
    this._popup.addEventListener('click', (e) => {
      if (e.target.closest('popup__block') || e.target === closebuttom) {
        this.close();
      }
    })
  }
}