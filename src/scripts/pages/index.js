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
import { api } from '../components/Api'

const addCardFormValidation = new FormValidator(config, constants.popupFormAdd);
const editProfileFormValidation = new FormValidator(config, constants.formProfileEdit);
const newAvatarValidation = new FormValidator(config, constants.formAvatarEdit);

const section = new Section(addPhoto, '.gallery__list');
const popupWithImage = new PopupWithImage('.popup_viewing');
const addPopupForm = new PopupWithForm('.popup_add', addImageFormSubmitHandler);
const editPopupForm = new PopupWithForm('.popup_profile', editProfileSubmitFormHandling);

const confirmPopup = new PopupWithForm('.popup_type_card-delete');
const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const newAvatar = new PopupWithForm('.popup_type_edit-avatar', submitAvatarForm);

let userId;

function avatarChange() {
  newAvatarValidation.resetButtonMessegeError();
  newAvatar.openPopup();
}

function editingProfiles() {
  const { name, job } = userInfo.getUserInfo();
  constants.nameInput.value = name;
  constants.jobInput.value = job;
  editProfileFormValidation.resetButtonMessegeError();
  editPopupForm.openPopup();
}

function addImageOpenPopup() {
  addCardFormValidation.resetButtonMessegeError();
  addPopupForm.openPopup();
}

function editProfileSubmitFormHandling({ name, job }) {
  api.editProfile(name, job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      editPopupForm.closePopup();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => { editPopupForm.changingTextSubmission(false); })
};

function addImageFormSubmitHandler({ name, link }) {
  api.addCard(name, link)
    .then(res => {
      addPhoto(res);
      addPopupForm.closePopup();
    })
    .catch((err) => {
      err.then((res) => {
        alert(res.message)
      })
    })
    .finally(() => { addPopupForm.changingTextSubmission(false); })
}

function submitAvatarForm({ linkAvatar }) {
  api.changeAvatar(linkAvatar)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      newAvatar.closePopup();
    })
    .catch((err) => {
      err.then((res) => {
        console.log(res.message)
      })
    })
    .finally(() => { newAvatar.changingTextSubmission(false); })
}


function addPhoto(image) {
  section.addItem(createCard(image));
};

function createCard(image) {
  const card = new Card(
    image,
    constants.imageTemplate,
    () => {
      popupWithImage.openPopup(image.name, image.link);
    },
    (id) => {
      confirmPopup.openPopup();
      confirmPopup.changeSubmitHandler(() => {
        confirmPopup.changingTextSubmission(false);
        api.deleteCard(id)
          .then(() => {
            card.deleteCards();
            confirmPopup.closePopup();
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      });
    },
    userId,
    (id) => {
      if (card.Liked()) {
        api.deleteLike(id)
          .then((res) => {
            card.likesCount(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      } else {
        api.addLike(id)
          .then((res) => {
            card.likesCount(res.likes);
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
      }
    }
  );
  const photo = card.generateCard();
  return photo;
}


constants.buttonOpenPopupEdit.addEventListener('click', editingProfiles);
constants.profileButton.addEventListener('click', addImageOpenPopup);
constants.openPopupAvatarChange.addEventListener('click', avatarChange);

addCardFormValidation.enableValidation();
editProfileFormValidation.enableValidation();
newAvatarValidation.enableValidation();
popupWithImage.setEventListeners();
addPopupForm.setEventListeners();
editPopupForm.setEventListeners();
confirmPopup.setEventListeners();
newAvatar.setEventListeners()

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([res, cardList]) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;
    section.renderItems(cardList);
  })
  .catch((err) => {
    err.then((res) => {
      alert(res.message);
    })
  })