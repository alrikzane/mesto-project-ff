const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

function deleteCard(card){
  card.remove();
};

function handleLike(evt, startLike, stopLike, cardId, likesCounter) {
  if (evt.target.classList.contains('card__like-button')) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
      stopLike(cardId);
      likesCounter.innerText = Number(likesCounter.innerText) - 1;
    } else {
      startLike(cardId);
      likesCounter.innerText = Number(likesCounter.innerText) + 1;
    }
    evt.target.classList.toggle('card__like-button_is-active');
  }  
}

function getCard(cardData, myId, zoomImage, deleteCardRemote, startLike, stopLike) {
  const card =  cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');  
  const likesCounterElement = card.querySelector('.like-counter');
  const likesCounter = cardData.likesIdList.length;
  likesCounterElement.innerText = likesCounter;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  card.querySelector(".card__title").innerText = cardData.name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (myId === cardData.ownerId) {
    cardDeleteButton.addEventListener('click', () => {
      deleteCardRemote(cardData.cardId);
      deleteCard(card);
    });
  } else {
    cardDeleteButton.remove();
  }
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', evt =>{
    handleLike(evt, startLike, stopLike, cardData.cardId, likesCounterElement);
  } );
  if (cardData.likesIdList.includes(myId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  cardImage.addEventListener('click', zoomImage);
  return card
}

export {getCard};