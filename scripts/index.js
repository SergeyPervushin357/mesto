import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenPopupEdit = document.querySelector('.profile__open');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const addCardPopup = document.querySelector('.popup_add');
const imageTemplate = '.images';
const gallerylist = document.querySelector('.gallery__list');
const popupImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_viewing');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeName = document.querySelector('.popup__text_name');
const popupTypeLink = document.querySelector('.popup__text_type_link');
const popupProfile = document.querySelector('.popup_profile');
const popupFormAdd = document.querySelector('.popup__form_image');
const formProfileEdit = document.querySelector('.popup__form_edit');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
}
const addCardFormValidation = new FormValidator(config, popupFormAdd);
const editProfileFormValidation = new FormValidator(config, formProfileEdit);

function openPopup(popup) {
  document.addEventListener('keydown', escapeOutput);
  popup.classList.add('popup_open');
}

function closingPopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', escapeOutput);
}

function editingProfiles() {
  editProfileFormValidation.resetButtonMessegeError();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function addImageOpenPopup() {
  popupFormAdd.reset();
  addCardFormValidation.resetButtonMessegeError();
  openPopup(addCardPopup);
}

function editProfileSubmitFormHandling(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closingPopup(popupProfile);
}

function addNewImage(image) {
  const card = new Card(image, imageTemplate, zoomImagePopup);
  const photo = card.generateCard();
  return photo;
}

function addImageFormSubmitHandler(event) {
  event.preventDefault();
  addPhoto({ name: popupTypeName.value, link: popupTypeLink.value });
  addCardFormValidation.deactivateButton();
  closingPopup(addCardPopup);
}

function addPhoto(image) {
  gallerylist.prepend(addNewImage(image));
}

function zoomImagePopup(item) {
  popupCaption.textContent = item.name;
  popupImage.alt = item.name;
  popupImage.src = item.link;
  openPopup(popupOpenImage);
}

function escapeOutput(evt) {
  if (evt.key === 'Escape') {
    closingPopup(document.querySelector('.popup_open'));
  }
}

popups.forEach(popup => popup.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('popup_open') | evt.target.classList.contains('popup__closed')) {
    closingPopup(popup);
  }
}))

formProfileEdit.addEventListener('submit', editProfileSubmitFormHandling);
buttonOpenPopupEdit.addEventListener('click', editingProfiles);
profileButton.addEventListener('click', addImageOpenPopup);
popupFormAdd.addEventListener('submit', addImageFormSubmitHandler);

initialCards.forEach(image => addPhoto(image));
addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();