const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__text_error');
    inputElement.classList.add('form__error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__text_error');
    inputElement.classList.remove('form__error');
    errorElement.classList.remove('form__error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (configureValidations) => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};


const configureValidations = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: 'popup__save_disabled',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'form__error_active'
}
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(configureValidations);

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_disabled');
    } else {
        buttonElement.classList.remove('popup__save_disabled');
    }
}