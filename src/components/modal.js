const handleEscKey = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown',handleEscKey);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown',handleEscKey);
  const inputList = Array.from(modal.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.value = '';
  })
}

export {handleEscKey as handleEscKeyUp, openModal, closeModal};


