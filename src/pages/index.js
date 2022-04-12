import '../pages/index.css';
import { Card } from "../scripts/components/Card";
import { FormValidator } from "../scripts/components/FormValidator";
import { Section } from '../scripts/components/Section'
import * as constants from '../scripts/utils/constants';
import { config } from '../scripts/utils/configValidation';
import { PopupWithImage } from '../scripts/components/PopupWithImage';
import { PopupWithForm } from '../scripts/components/PopupWithForm';
import { PopupWithConfirm } from '../scripts/components/PopupWithConfirm';
import { UserInfo } from '../scripts/components/UserInfo';
import { api } from '../scripts/components/Api'

const addCardFormValidation = new FormValidator(config, constants.popupFormAdd);
const editProfileFormValidation = new FormValidator(config, constants.formProfileEdit);
const newAvatarValidation = new FormValidator(config, constants.formAvatarEdit);

const section = new Section(addPhoto, '.gallery__list');

const popupWithImage = new PopupWithImage('.popup_viewing');

const addPopupForm = new PopupWithForm('.popup_add', addImageFormSubmitHandler, 'Добавляем картинку...');
const editPopupForm = new PopupWithForm('.popup_profile', editProfileSubmitFormHandling, 'Сохранение...');
const newAvatar = new PopupWithForm('.popup_type_edit-avatar', submitAvatarForm, 'Сохранение...');

const confirmPopup = new PopupWithConfirm('.popup_type_card-delete', 'Удаление...');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

let userId;

function avatarChange() {
  newAvatarValidation.resetButtonMessegeError();
  newAvatar.openPopup();
}

function editingProfiles() {
  editPopupForm.setInputValues(userInfo.getUserInfo())
  editProfileFormValidation.resetButtonMessegeError();
  editPopupForm.openPopup();
}

function addImageOpenPopup() {
  addCardFormValidation.resetButtonMessegeError();
  addPopupForm.openPopup();
}

function editProfileSubmitFormHandling({ name, job }) {
  return api.editProfile(name, job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
};

function addImageFormSubmitHandler({ name, link }) {
  const createdSubmit = true;
  return api.addCard(name, link)
    .then(res => {
      addPhoto(res, createdSubmit);
      deleteLastCard();
    })
}

function submitAvatarForm({ linkAvatar }) {
 return api.changeAvatar(linkAvatar)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
}

function deleteLastCard() {
  document.querySelector('.gallery__list').lastElementChild.remove();
}

function addPhoto(image, createdSubmit) {
  section.addItem(createCard(image), createdSubmit);
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
        api.deleteCard(id)
          .then(() => {
            card.deleteCards();
            confirmPopup.closePopup();
            api.getInitialCards()
              .then(cardList => {
                addPhoto(cardList[cardList.length - 1], false);
              })
              .catch((err) => {
                err.then((res) => {
                  alert(res.message)
                })
              })
          })
          .catch((err) => {
            err.then((res) => {
              alert(res.message)
            })
          })
          .finally(() => { confirmPopup.changingTextSubmission(false); })
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
newAvatar.setEventListeners();
confirmPopup.setEventListeners();

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