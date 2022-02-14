//we find the elements in html and save them in a variable
const popup = document.querySelector('.popup');
const profilebutton = document.querySelector('.profile__button');
const formElement = document.querySelector('.popup__info');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const buttonclosed = document.querySelector('.popup__closed');
const openbutton = document.querySelector('.profile__open');
const title = document.querySelector('.profile__title');
const researcher = document.querySelector('.profile__researcher');
const buttonclosedadd = document.querySelector('.popup__closed_add');
const popupadd = document.querySelector('.popup_add');
const popupsavadd = document.querySelector('.popup__save_add');
const images = document.querySelector('.images').content;
const gallerylist = document.querySelector('.gallery__list');
const popupimage = document.querySelector('.popup__image');
const popupbig = document.querySelector('.popup_big');
const popupcaption = document.querySelector('.popup__caption');
const popuptypename = document.querySelector('.popup__text_name');
const popuptypelink = document.querySelector('.popup__text_type_link');
const popupprofile = document.querySelector('.popup_profile');
const popupclosedimg = document.querySelector('.popup__closed_img');


//opening the pop-up.
function popuponON(popup) {
    popup.classList.add('popup_open');
}
//closing the pop-up.
function popupOff(popup) {
    popup.classList.remove('popup_open');
}
//profiles function
function Editingprofiles() {
    nameInput.value = title.textContent;
    jobInput.value = researcher.textContent;
    popuponON(popupprofile);
}

// opening the pop-up add
function popupaddON() {
    popuponON(popupadd);
}
// closing the pop-up add
function popupaddOff() {
    popupOff(popupadd);
}

// Handler for "sending" the form.
function formSubmitHandler(event) {
    event.preventDefault();
    title.textContent = nameInput.value;
    researcher.textContent = jobInput.value;
    popupOff(popupprofile);
}

// Attaching the handler to the form:
// it will track the "send" - "sending" event
formElement.addEventListener('submit', formSubmitHandler);


//adding an array
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
initialCards.forEach(Cards);
//adding pictures
function newimage(image) {
    const photo = images.cloneNode(true);
    const galleryphoto = photo.querySelector('.gallery__photo');
    const gallerytext = photo.querySelector('.gallery__text');
    const deleteimages = photo.querySelector('.gallery__delete');
    deleteimages.addEventListener('click', deleteimage);
    const likeheart = photo.querySelector('.gallery__heart');
    likeheart.addEventListener('click', likeImage);
    gallerytext.textContent = image.name;
    galleryphoto.src = image.link;
    galleryphoto.alt = image.name;
    galleryphoto.addEventListener('click', () => popupphoto(image));
    return photo;
}
//form addimage
function addimage(event) {
    event.preventDefault();
    popupaddOff();
    Cards({ name: popuptypename.value, link: popuptypelink.value });
}
//deleting the image
function deleteimage(a) {
    a.target.closest('.gallery__image').remove();
}
//adding likes
function likeImage(a) {
    a.target.classList.toggle('gallery__heart_active');
}

function Cards(image) {
    gallerylist.prepend(newimage(image));
}
//form function
function popupphoto(item) {
    popuponON(popupbig);
    popupcaption.textContent = item.name;
    popupimage.alt = item.name;
    popupimage.src = item.link;
}

//listeners
openbutton.addEventListener('click', Editingprofiles);
buttonclosed.addEventListener('click', () => popupOff(popupprofile));
profilebutton.addEventListener('click', popupaddON);
buttonclosedadd.addEventListener('click', () => popupaddOff(popupadd));
popupsavadd.addEventListener('click', addimage);
popupclosedimg.addEventListener('click', () => popupOff(popupbig));