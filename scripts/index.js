// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function deleteCard(event){
  const cardToDelete = event.target.closest('.card');
  cardToDelete.remove();
};

function getCard(name, link, callback){
  const cardTemplate = document.querySelector('#card-template').content;
  const card =  cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__title").innerText = name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener('click', callback);
  return card
}

function publishCard(name, link, callback) {
  document.querySelector(".places__list").append(getCard(name, link, callback));
}

initialCards.forEach(card => {
  publishCard(card.name, card.link, deleteCard);
})

















