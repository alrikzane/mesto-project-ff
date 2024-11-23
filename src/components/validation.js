const checkValidity = (formElement, inputElement, selectors) =>{
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

export {checkValidity, toggleButtonState};