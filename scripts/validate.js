const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__text_error');
    errorElement.classList.add('popup__span_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__text_error');
    errorElement.classList.remove('popup__span_error');
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

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_disabled');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__save_disabled');
        buttonElement.removeAttribute('disabled');
    }
}


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
    inputErrorClass: 'popup__span_error',
    errorClass: 'form__error_active'
}
// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(configureValidations);