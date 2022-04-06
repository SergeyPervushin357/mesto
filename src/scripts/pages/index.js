import '../../styles/index.css';
import { initialCards } from "../utils/initial-cards";
import { Card } from "../components/Card";
import { FormValidator } from "../components/FormValidator";
import { Section } from '../components/Section'
import * as constants from '../utils/constants';
import { config } from '../utils/configValidation';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';

const addCardFormValidation = new FormValidator(config, constants.popupFormAdd);
const editProfileFormValidation = new FormValidator(config, constants.formProfileEdit);

const section = new Section({ items: initialCards, renderer: addPhoto }, '.gallery__list');
const popupWithImage = new PopupWithImage('.popup_viewing');
const addPopupForm = new PopupWithForm('.popup_add', addImageFormSubmitHandler);
const editPopupForm = new PopupWithForm('.popup_profile', editProfileSubmitFormHandling);
const userInfo = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle' });

function editingProfiles() {
  editProfileFormValidation.resetButtonMessegeError();
  const { name, job } = userInfo.getUserInfo();
  constants.nameInput.value = name;
  constants.jobInput.value = job;
  editPopupForm.openPopup();
}

function addImageOpenPopup() {
  constants.popupFormAdd.reset();
  addCardFormValidation.resetButtonMessegeError();
  addPopupForm.openPopup();
}

function editProfileSubmitFormHandling(data) {
  const { name, job } = data;
  userInfo.setUserInfo(name, job);
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

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
popupWithImage.setEventListeners();
addPopupForm.setEventListeners();
editPopupForm.setEventListeners();
section.renderItems();