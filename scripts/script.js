let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__info');
let nameInput = document.querySelector('.popup__text_nameInput');
let jobInput = document.querySelector('.popup__text_jobInput');
let buttonclosed = document.querySelector('.popup__closed');
let openbutton = document.querySelector('.profile__vector');
let title = document.querySelector('.profile__title');
let researcher = document.querySelector('.profile__researcher');

function popuponON() {
    popup.classList.add('popup_opened');
}

function popupOff() {
    popup.classList.remove('popup_opened');
}

openbutton.addEventListener('click', popuponON);
buttonclosed.addEventListener('click', popupOff);

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    researcher.textContent = jobInput.value;
    popupOff();
}

formElement.addEventListener('submit', formSubmitHandler);