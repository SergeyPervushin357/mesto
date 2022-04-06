import '../../styles/index.css';
import { initialCards } from "../utils/initial-cards";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from '../components/Section'
import * as constants from '../utils/constants';
import { config } from '../utils/configValidation';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';

const addCardFormValidation = new FormValidator(config, constants.popupFormAdd);
const editProfileFormValidation = new FormValidator(config, constants.formProfileEdit);

const section = new Section({ items: initialCards, renderer: addPhoto }, '.gallery__list');
const popupWithImage = new PopupWithImage('.popup_viewing');
const addPopupForm = new PopupWithForm('.popup_add', addImageFormSubmitHandler);
const editPopupForm = new PopupWithForm('.popup_profile', editProfileSubmitFormHandling);

function editingProfiles() {
  editProfileFormValidation.resetButtonMessegeError();
  constants.nameInput.value = constants.profileTitle.textContent;
  constants.jobInput.value = constants.profileSubtitle.textContent;
  editPopupForm.openPopup(constants.popupProfile);
}

function addImageOpenPopup() {
  constants.popupFormAdd.reset();
  addCardFormValidation.resetButtonMessegeError();
  addPopupForm.openPopup(constants.addCardPopup);
}

function editProfileSubmitFormHandling(data) {
  const {name, job} = data;
  constants.profileTitle.textContent = name;
  constants.profileSubtitle.textContent = job;
  editPopupForm.closePopup();
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

function addImageFormSubmitHandler(data) {
  section.addItem(addNewImage(data));
  addCardFormValidation.deactivateButton();
  addPopupForm.closePopup();
}

function addPhoto(image) {
  section.addItem(addNewImage(image));
}


constants.buttonOpenPopupEdit.addEventListener('click', editingProfiles);
constants.profileButton.addEventListener('click', addImageOpenPopup);

popupWithImage.setEventListeners();

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
addPopupForm.setEventListeners();
editPopupForm.setEventListeners();


section.renderItems();