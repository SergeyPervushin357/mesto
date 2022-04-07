export class Card {
  constructor(dataCard, templateSelector, zoomImagePopup) {
    this._templateSelector = templateSelector;
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._zoomImagePopup = zoomImagePopup;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__image')
      .cloneNode(true);
    return elementCard;
  }

  generateCard() {
    this._gallery = this._getTemplate();
    this._galleryPhoto = this._gallery.querySelector('.gallery__photo');
    this._gallery.querySelector('.gallery__text').textContent = this._name;
    this._galleryPhoto.src = this._link;
    this._galleryPhoto.alt = this._name;
    this._buttonLike = this._gallery.querySelector('.gallery__heart');
    this._buttonDelete = this._gallery.querySelector('.gallery__delete');
    this._setAddEventListener();
    return this._gallery;
  }

  _setAddEventListener() {
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._buttonLike.addEventListener('click', () => this._likeCard());
    this._galleryPhoto.addEventListener('click', () => {
      this._zoomImagePopup({ link: this._link, name: this._name });
    })
  }

  _deleteCard() {
    this._gallery.remove();
    this._gallery = null;
  }

  _likeCard() {
    this._buttonLike.classList.toggle('gallery__heart_active');
  }
}