import {closeModal} from './modal';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const galleryList = document.querySelector('.places__list');


const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
initialCards.reverse();

function deleteCard(event){
  const cardToDelete = event.target.closest('.card');
  cardToDelete.remove();
};

function handleLike(evt){
  evt.target.classList.toggle('card__like-button_is-active');
}

function getCard(name, link){
  const card =  cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');  
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".card__title").innerText = name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener('click', deleteCard);
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLike);
  return card
}

function publishCard(name, link) {
  galleryList.prepend(getCard(name, link));
}

const formNewPlace = document.getElementsByName('new-place')[0];
const nameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

function handleFormCard(evt) {
  evt.preventDefault();
  publishCard(nameInput.value, linkInput.value);
  nameInput.value = '';
  linkInput.value = '';
  closeModal(evt.target.closest('.popup_type_new-card'));
}
formNewPlace.addEventListener('submit', handleFormCard);


export {initialCards, publishCard};