//определяем переменные
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__info');
let nameInput = document.querySelector('.popup__text-name');
let jobInput = document.querySelector('.popup__text-job');
let buttonclosed = document.querySelector('.popup__closed');
let openbutton = document.querySelector('.profile__open');
let title = document.querySelector('.profile__title');
let researcher = document.querySelector('.profile__researcher');

//открываем попап.
//p.s. Здравствуйте Оксана. Не совсем понимаю сути задачи? При открытии popap у меня вставляются данные из профиля.
function popuponON() {
    popup.classList.add('popup_open');

}
//закрываем попап.
function popupOff() {
    popup.classList.remove('popup_open');
}

// Обработчик «отправки» формы.
function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    researcher.textContent = jobInput.value;
    popupOff();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//
openbutton.addEventListener('click', popuponON);
buttonclosed.addEventListener('click', popupOff);