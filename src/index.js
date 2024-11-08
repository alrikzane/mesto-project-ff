import './pages/index.css';
import {openModal, closeModal, openImageModal} from './components/modal';
import {getCard} from './components/card';
import {initialCards} from './components/cards';
const galleryList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const cardList = document.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');




profileEditButton.addEventListener('click', evt => openModal(editModal));
newCardButton.addEventListener('click', evt => openModal(newCardModal));
cardList.addEventListener('click', evt =>  openImageModal(evt, imageModal));


editModal.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closeModal(editModal);
  }
});

newCardModal.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closeModal(newCardModal);
  }
});

imageModal.addEventListener('click', evt => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closeModal(imageModal);
  }
});

function publishCard(name, link) {
  galleryList.prepend(getCard(name, link));
}

initialCards.forEach(card => {
  publishCard(card.name, card.link);
})

const formNewPlace = document.getElementsByName('new-place')[0];
const nameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

formNewPlace.addEventListener('submit', handleFormCard);


function handleFormCard(evt) {
  evt.preventDefault();
  publishCard(nameInput.value, linkInput.value);
  nameInput.value = '';
  linkInput.value = '';
  closeModal(newCardModal);
}

















