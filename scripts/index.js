//we find the elements in html and save them in a variable
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile');
const porfilePopupCloseButton = profilePopup.querySelector('.popup__closed');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenPopupEdit = document.querySelector('.profile__open');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const addCardPopup = document.querySelector('.popup_add');
const buttonClosedAdd = addCardPopup.querySelector('.popup__closed_add');
const popupSaveAdd = document.querySelector('.popup__save');
const imageTemplate = document.querySelector('.images').content;
const gallerylist = document.querySelector('.gallery__list');
const popupImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_viewing');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeName = document.querySelector('.popup__text_name');
const popupTypeLink = document.querySelector('.popup__text_type_link');
const popupProfile = document.querySelector('.popup_profile');
const popupClosedImg = document.querySelector('.popup__closed_img');
const popupFormAdd = document.querySelector('.popup__form_image');
const formProfileEdit = document.querySelector('.popup__form_edit');


//opening the pop-up.
function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', escapeOutput);
}
//closing the pop-up.
function closingPopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', escapeOutput);
}
//profiles function
function editingProfiles() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

// opening the pop-up add
function addImageOpenPopup() {
  popupFormAdd.reset();
  deactivationButtonsAddImage(addCardPopup);
  openPopup(addCardPopup);
}
// closing the pop-up add
function addImageClosingPopup() {
  closingPopup(addCardPopup);
}

// Handler for "sending" the form.
function editProfileSubmitFormHandling(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closingPopup(popupProfile);
}


// Attaching the handler to the form:
// it will track the "send" - "sending" event
formProfileEdit.addEventListener('submit', editProfileSubmitFormHandling);


//adding pictures
function addNewImage(image) {
  const photo = imageTemplate.cloneNode(true);
  const galleryPhoto = photo.querySelector('.gallery__photo');
  const galleryText = photo.querySelector('.gallery__text');
  const deleteImages = photo.querySelector('.gallery__delete');
  deleteImages.addEventListener('click', deleteImage);
  const likeHeart = photo.querySelector('.gallery__heart');
  likeHeart.addEventListener('click', likeImage);
  galleryText.textContent = image.name;
  galleryPhoto.src = image.link;
  galleryPhoto.alt = image.name;
  galleryPhoto.addEventListener('click', () => zoomImagePopup(image));
  return photo;
}
function addImageFormSubmitHandler(event) {
  event.preventDefault();
  addImageClosingPopup();
  addPhoto({ name: popupTypeName.value, link: popupTypeLink.value });
}

function addPhoto(image) {
  gallerylist.prepend(addNewImage(image));
}
initialCards.forEach(addPhoto);
//deleting the image
function deleteImage(event) {
  event.target.closest('.gallery__image').remove();
}
//adding likes
function likeImage(event) {
  event.target.classList.toggle('gallery__heart_active');
}


//form function
function zoomImagePopup(item) {
  openPopup(popupOpenImage);
  popupCaption.textContent = item.name;
  popupImage.alt = item.name;
  popupImage.src = item.link;
}
function escapeOutput(evt) {
  if (evt.key === 'Escape') {
    const escape = document.querySelector('.popup_open');
    closingPopup(escape);
  }
}

popups.forEach(popup => popup.addEventListener('mousedown', evt => {if (evt.target.classList.contains('popup_open')) {closingPopup(popup)}}))

//listeners
buttonOpenPopupEdit.addEventListener('click', editingProfiles);
porfilePopupCloseButton.addEventListener('click', () => closingPopup(popupProfile));
profileButton.addEventListener('click', addImageOpenPopup);
buttonClosedAdd.addEventListener('click', () => addImageClosingPopup(addCardPopup));
popupFormAdd.addEventListener('submit', addImageFormSubmitHandler);
popupClosedImg.addEventListener('click', () => closingPopup(popupOpenImage));