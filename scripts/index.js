//we find the elements in html and save them in a variable
const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('.popup_profile');
const porfilePopupCloseButton = profilePopup.querySelector('.popup__closed');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openButton = document.querySelector('.profile__open');
const formElement = document.querySelector('.popup__info');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const addCardPopup = document.querySelector('.popup_add');
const buttonClosedAdd = addCardPopup.querySelector('.popup__closed_add');
const popupSaveAdd = addCardPopup.querySelector('.popup__save_add');
const imageTemplate = document.querySelector('.images').content;
const gallerylist = document.querySelector('.gallery__list');
const popupImage = document.querySelector('.popup__image');
const popupOpenImage = document.querySelector('.popup_viewing');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeName = document.querySelector('.popup__text_name');
const popupTypeLink = document.querySelector('.popup__text_type_link');
const popupProfile = document.querySelector('.popup_profile');
const popupClosedImg = document.querySelector('.popup__closed_img');
const popupFormAdd = document.querySelector('.popup__form');


//opening the pop-up.
function popupOpen(popup) {
    popup.classList.add('popup_open');
    
}
//closing the pop-up.
function popupClosing(popup) {
    popup.classList.remove('popup_open');
}
//profiles function
function editingProfiles() {
    popupOpen(popupProfile);
    nameInput.value = '';
    jobInput.value = '';
}

// opening the pop-up add
function popupAddOpen() {
    popupOpen(addCardPopup);
    popupTypeName.value = '';
    popupTypeLink.value = '';
}
// closing the pop-up add
function popupAddClosing() {
    popupClosing(addCardPopup);
}

// Handler for "sending" the form.
function formSubmitHandler(event) {
    event.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClosing(popupProfile);
}


// Attaching the handler to the form:
// it will track the "send" - "sending" event
formElement.addEventListener('submit', formSubmitHandler);

initialCards.forEach(addPhoto);
//adding pictures
function newImage(image) {
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
    galleryPhoto.addEventListener('click', () => popupPhotoProfile(image));
    return photo;
}
function addImage(event) {
    event.preventDefault();
    popupAddClosing();
    addPhoto({ name: popupTypeName.value, link: popupTypeLink.value });
}

function addPhoto(image) {
    gallerylist.prepend(newImage(image));
}
//deleting the image
function deleteImage(event) {
    event.target.closest('.gallery__image').remove();
}
//adding likes
function likeImage(event) {
    event.target.classList.toggle('gallery__heart_active');
}


//form function
function popupPhotoProfile(item) {
    popupOpen(popupOpenImage);
    popupCaption.textContent = item.name;
    popupImage.alt = item.name;
    popupImage.src = item.link;
}


//listeners
openButton.addEventListener('click', editingProfiles);
porfilePopupCloseButton.addEventListener('click', () => popupClosing(popupProfile));
profileButton.addEventListener('click', popupAddOpen);
buttonClosedAdd.addEventListener('click', () => popupAddClosing(addCardPopup));
popupFormAdd.addEventListener('submit', addImage);
popupClosedImg.addEventListener('click', () => popupClosing(popupOpenImage));