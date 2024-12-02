




const validateInputField = (formElement, inputElement, selectors) =>{
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (inputElement.validity.valid){
    hideInputError(inputElement, inputElement.validationMessage, selectors);
  } else {
    showInputError(inputElement, inputElement.validationMessage, selectors);
  } 
}

const showInputError = (input, errorMessage, selectors) => {
  input.classList.add(selectors.inputErrorClass);
  const errorSpan = input.nextElementSibling;
  errorSpan.classList.add(selectors.errorClass);
  errorSpan.textContent = errorMessage;
};

const hideInputError = (input, errorMessage, selectors) => {
  input.classList.remove(selectors.inputErrorClass);
  const errorSpan = input.nextElementSibling;
  errorSpan.classList.remove(selectors.errorClass);
  errorSpan.textContent = errorMessage;
};



const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInputField(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};

const clearValidation = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, inputElement.validationMessage, selectors);
  });
  toggleButtonState(inputList, formElement.querySelector(selectors.submitButtonSelector), selectors);
}

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};






export {clearValidation, enableValidation};