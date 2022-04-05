import '../../styles/index.css';
import { initialCards } from "../utils/initial-cards";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from '../components/Section'
import * as constants from '../utils/constants';
import { config } from '../utils/configValidation';
import { PopupWithImage } from '../components/PopupWithImage';

const addCardFormValidation = new FormValidator(config, constants.popupFormAdd);
const editProfileFormValidation = new FormValidator(config, constants.formProfileEdit);

const section = new Section({ items: initialCards, renderer: addPhoto }, '.gallery__list');
const popupWithImage = new PopupWithImage('.popup_viewing')

function editingProfiles() {
  editProfileFormValidation.resetButtonMessegeError();
  constants.nameInput.value = constants.profileTitle.textContent;
  constants.jobInput.value = constants.profileSubtitle.textContent;
  openPopup(constants.popupProfile);
}

function addImageOpenPopup() {
  constants.popupFormAdd.reset();
  addCardFormValidation.resetButtonMessegeError();
  openPopup(constants.addCardPopup);
}

function editProfileSubmitFormHandling(event) {
  event.preventDefault();
  constants.profileTitle.textContent = constants.nameInput.value;
  constants.profileSubtitle.textContent = constants.jobInput.value;
  closingPopup(constants.popupProfile);
}

function addNewImage(image) {
  const card = new Card(
    image,
    constants.imageTemplate,
    () => {
      popupWithImage.openPopup(image.name, image.link);
    });

  const photo = card.generateCard();
  return photo;
}

function addImageFormSubmitHandler(event) {
  event.preventDefault();
  addPhoto({ name: constants.popupTypeName.value, link: constants.popupTypeLink.value });
  addCardFormValidation.deactivateButton();
  closingPopup(constants.addCardPopup);
}

function addPhoto(image) {
  section.addItem(addNewImage(image));
}

constants.formProfileEdit.addEventListener('submit', editProfileSubmitFormHandling);
constants.buttonOpenPopupEdit.addEventListener('click', editingProfiles);
constants.profileButton.addEventListener('click', addImageOpenPopup);
constants.popupFormAdd.addEventListener('submit', addImageFormSubmitHandler);
popupWithImage.setEventListeners();

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();

section.renderItems();