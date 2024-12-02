const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');


function getCard(cardData, myId, zoomImage, deletecardCallback, handleLike) {
  const card =  cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');  
  const likesCounterElement = card.querySelector('.like-counter');
  likesCounterElement.innerText = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector(".card__title").innerText = cardData.name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (myId === cardData.ownerId) {
    cardDeleteButton.addEventListener('click', () => deletecardCallback(card, cardData.cardId));    
  } else {
    cardDeleteButton.remove();
  }
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', evt => handleLike(evt, cardData.cardId, likesCounterElement));
  if(cardData.likes.some(like=> like._id === myId)){ 
    likeButton.classList.add("card__like-button_is-active"); 
  }
  cardImage.addEventListener('click', zoomImage);
  return card
}

export {getCard};