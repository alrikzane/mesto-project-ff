import {closeModal} from './modal';

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


function deleteCard(card){
  card.remove();
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
  cardDeleteButton.addEventListener('click',() => deleteCard(card));
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', handleLike);
  return card
}

export {getCard};