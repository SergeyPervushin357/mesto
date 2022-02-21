const configureValidations = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_active'
}


const showInputError = (formElement, inputElement) => {
  const errorMessage = inputElement.validationMessage;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configureValidations['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configureValidations['errorClass']);
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configureValidations['inputErrorClass']);
  errorElement.classList.remove(configureValidations['errorClass']);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function resetButtonMessegeError(popup) {
  const popupForm = popup.querySelector(configureValidations['formSelector'])
  if (popupForm) {
    const inputList = Array.from(popupForm.querySelectorAll(configureValidations['inputSelector']));
    const buttonElement = popupForm.querySelector(configureValidations['submitButtonSelector']);
    inputList.forEach(inputElement => {
      hideInputError(popupForm, inputElement);
    })
    toggleButtonState(inputList, buttonElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configureValidations['inactiveButtonClass']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(configureValidations['inactiveButtonClass']);
    buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(configureValidations['inputSelector']));
  const buttonElement = formElement.querySelector(configureValidations['submitButtonSelector']);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(configureValidations['formSelector']));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();