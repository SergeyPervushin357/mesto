//we find the elements in html and save them in a variable
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__info');
let nameInput = document.querySelector('.popup__text-name');
let jobInput = document.querySelector('.popup__text-job');
let buttonclosed = document.querySelector('.popup__closed');
let openbutton = document.querySelector('.profile__open');
let title = document.querySelector('.profile__title');
let researcher = document.querySelector('.profile__researcher');

//opening the pop-up.
//p.s. Здравствуйте Оксана. Не совсем понимаю сути что должен исправить? При открытии pop-up у меня вставляются данные из профиля в форму. Если не сложно можно по подробнее.
function popuponON() {
    popup.classList.add('popup_open');

}
//closing the pop-up.
function popupOff() {
    popup.classList.remove('popup_open');
}

// Handler for "sending" the form.
function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    researcher.textContent = jobInput.value;
    popupOff();
}

// Attaching the handler to the form:
// it will track the "send" - "sending" event
formElement.addEventListener('submit', formSubmitHandler);

//listeners
openbutton.addEventListener('click', popuponON);
buttonclosed.addEventListener('click', popupOff);