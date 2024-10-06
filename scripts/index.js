// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const galleryList = document.querySelector(".places__list");

function deleteCard(event){
  const cardToDelete = event.target.closest('.card');
  cardToDelete.remove();
};

function getCard(name, link, callback){
  const card =  cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector(".card__title").innerText = name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener('click', callback);
  return card
}

function publishCard(name, link, callback) {
  galleryList.append(getCard(name, link, callback));
}

initialCards.forEach(card => {
  publishCard(card.name, card.link, deleteCard);
})

















