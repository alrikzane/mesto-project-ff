import './pages/index.css';
import {openModal, closeModal, openImageModal, closeImageModal} from './components/modal';
import {initialCards, publishCard} from './components/cards';


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
    closeImageModal(imageModal);
  }
});

initialCards.forEach(card => {
  publishCard(card.name, card.link);
})






















