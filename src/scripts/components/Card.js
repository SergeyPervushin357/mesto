export class Card {
  constructor(dataCard, templateSelector, zoomImagePopup, deleteImage, userId, handleLikeClick) {
    this._templateSelector = templateSelector;
    this._link = dataCard.link;
    this._name = dataCard.name;
    this._likes = dataCard.likes;
    this._id = dataCard._id;
    this._userId = userId;
    this._ownerId = dataCard.owner._id;
    this._zoomImagePopup = zoomImagePopup;
    this._deleteImage = deleteImage;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCount = this._gallery.querySelector('.gallery__heart-count');
    this._buttonLike = this._gallery.querySelector('.gallery__heart');
    this._buttonDelete = this._gallery.querySelector('.gallery__delete');
    this._setAddEventListener();
    this.likesCount(this._likes);
    if (this._ownerId !== this._userId) {
      this._buttonDelete.style.display = 'none';
    };
    return this._gallery;
  }

  _setAddEventListener() {
    this._buttonDelete.addEventListener('click', () => this._deleteImage(this._id));
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));
    this._galleryPhoto.addEventListener('click', () => {
      this._zoomImagePopup({ link: this._link, name: this._name });
    })
  }

  deleteCards() {
    this._gallery.remove();
    this._gallery = null;
  }

  _fillLike() {
    this._buttonLike.classList.add('gallery__heart_active');
  };

  _removeLike() {
    this._buttonLike.classList.remove('gallery__heart_active');
  };

  Liked() {
    return this._likes.find(user => user._id === this._userId);
  }

  likesCount(newLikes) {
    this._likes = newLikes;
    this._likeCount.textContent = newLikes.length;
    if (this.Liked()) {
      this._fillLike()
    } else {
      this._removeLike();
    }
  }
}