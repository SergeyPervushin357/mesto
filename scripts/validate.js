const showInputError = (configureValidations, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configureValidations['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configureValidations['errorClass']);
}

const hideInputError = (configureValidations, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configureValidations['inputErrorClass']);
  errorElement.classList.remove(configureValidations['errorClass']);
  errorElement.textContent = '';
};

const checkInputValidity = (configureValidations, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(configureValidations, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(configureValidations, formElement, inputElement);
  }
};

function deactivationButtonsAddImage(popup) {
  const buttonСreateCardImage = popup.querySelector('.popup__save_add');
  buttonСreateCardImage.classList.add('popup__save_disabled');
  buttonСreateCardImage.setAttribute('disabled', true);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
function toggleButtonState(configureValidations, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configureValidations['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(configureValidations['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled');
  }
}

function showSpan (configureValidations) {
  const buttonСlosePopups = popup.querySelectorAll('.popup__closed');
  hideInputError(configureValidations, formElement, inputElement);


}

const setEventListeners = (configureValidations, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(configureValidations['inputSelector']));
  const buttonElement = formElement.querySelector(configureValidations['submitButtonSelector']);
  toggleButtonState(configureValidations, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(configureValidations, formElement, inputElement);
      toggleButtonState(configureValidations, inputList, buttonElement);
    });
  });
};

const enableValidation = configureValidations => {
  const formList = Array.from(document.querySelectorAll(configureValidations['formSelector']));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(configureValidations, formElement);
  });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
});