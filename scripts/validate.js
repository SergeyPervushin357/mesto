const showInputError = (configureValidations, formElement, inputElement) => {
  const errorMessage = inputElement.validationMessage;
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
    showInputError(configureValidations, formElement, inputElement);
  } else {
    hideInputError(configureValidations, formElement, inputElement);
  }
};

function resetButtonMessegeError(popup) {
  const configureValidations = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error_active'
  }
  const popupForm = popup.querySelector(configureValidations['formSelector'])
  if (popupForm) {
    const inputList = Array.from(popupForm.querySelectorAll(configureValidations['inputSelector']));
    const buttonElement = popupForm.querySelector(configureValidations['submitButtonSelector']);
    inputList.forEach(inputElement => {
      hideInputError(configureValidations, popupForm, inputElement);
    })
    toggleButtonState(configureValidations, inputList, buttonElement);
  }
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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
})