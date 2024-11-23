import './pages/index.css';
import {openModal, closeModal} from './components/modal';
import {getCard} from './components/card';
import {initialCards} from './components/cards';
import {checkValidity, toggleButtonState } from './components/validation';
const galleryList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const img = imageModal.querySelector('.popup__image');
const caption = imageModal.querySelector('.popup__caption');


profileEditButton.addEventListener('click', () => {
  fillProfileModal();
  openModal(editModal);
});
newCardButton.addEventListener('click', () => openModal(newCardModal));



[editModal, newCardModal, imageModal].forEach(modal => {
  modal.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
      closeModal(modal);
    }
  });
});

const zoomImage = (evt) => {
  openModal(imageModal);    
  img.src = evt.target.src;
  img.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
}

function publishCard(name, link) {
  galleryList.prepend(getCard(name, link, zoomImage));
}

initialCards.forEach(card => {
  publishCard(card.name, card.link);
})

/* Add new place form block */

const formNewPlace = document.getElementsByName('new-place')[0];
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

formNewPlace.addEventListener('submit', handleFormCard);

function handleFormCard(evt) {
  evt.preventDefault();
  publishCard(placeInput.value, linkInput.value);
  placeInput.value = '';
  linkInput.value = '';
  closeModal(newCardModal);
}

/* Edit profile form block */

const formEditProfile = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

formEditProfile.addEventListener('submit', handleFormProfile);

function handleFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.target.closest('.popup_type_edit'));
}

function fillProfileModal(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

/* Validation */

const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
};


const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

