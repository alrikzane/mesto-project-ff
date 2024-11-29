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
const editAvatarModal = document.querySelector('.popup_type_edit_avatar');

const editAvatarButton = document.querySelector('.profile__image');
const editAvatarButtonCover = editAvatarButton.querySelector('.profile__image__overlay');
editAvatarButton.addEventListener('mouseover', () => {
  editAvatarButtonCover.style.display = 'flex';
})
editAvatarButton.addEventListener('mouseout', () => {
  editAvatarButtonCover.style.display = 'none';
})
editAvatarButton.addEventListener('click', () => openModal(editAvatarModal));


const token = 'b4ccb494-d10e-4dc4-80ce-41c10ff84550';
const serverLinkCohortId = 'https://mesto.nomoreparties.co/v1/wff-cohort-27';
const userInfo = `${serverLinkCohortId}/users/me`;
const cardServerLink = `${serverLinkCohortId}/cards`;
const myId = '3ddd768593f43d868606cab2';

profileEditButton.addEventListener('click', () => {
  fillProfileModal();
  openModal(editModal);
});
newCardButton.addEventListener('click', () => openModal(newCardModal));



[editModal, newCardModal, imageModal, editAvatarModal].forEach(modal => {
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

function publishCardLocal(name, link, ownerId, cardId, likesIdList) {
  galleryList.prepend(getCard({
    name: name,
    link: link,
    ownerId: ownerId,
    cardId: cardId,
    likesIdList: likesIdList
  },
    myId, zoomImage, deleteCardRemote, startLike, stopLike));
}

/* Add new place form block */

const formNewPlace = newCardModal.querySelector('.popup__form');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

formNewPlace.addEventListener('submit', handleFormCard);

function handleFormCard(evt) {
  evt.preventDefault();  
  const cardValue = placeInput.value;
  const cardLink = linkInput.value;
  addNewCardRemote(cardValue, cardLink);
  
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

const getUserInfo = () => {
  fetch(userInfo, {
    method: 'GET', 
    headers: {
      authorization: token
    }
  })
  .then(res => res.json())
  .then((result) => {
/*     console.log(result.name);
    console.log(result.about);
    console.log(result.avatar);
    console.log(result._id);
    console.log(result.cohort); */
    profileName.textContent = result.name;
    profileDescription.textContent = result.about;
    editAvatarButton.style.backgroundImage = `url(${result.avatar})`;    
  })
}
getUserInfo();

const editUserInfo = (newName, newDescription) => {
  fetch(userInfo, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  });
}

const editUserAvatar = (url) => {
  fetch(`${userInfo}/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  });
}

formEditProfile.addEventListener('submit', handleFormProfile);

function handleFormProfile(evt) {
  evt.preventDefault();
  editUserInfo(nameInput.value, jobInput.value);
  getUserInfo();
  closeModal(evt.target.closest('.popup_type_edit'));
}

function fillProfileModal(){
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}


/* Edit avatar form block */

const formEditAvatar = editAvatarModal.querySelector('.popup__form');
const avatarInput = formEditAvatar.querySelector('.popup__input_type_avatar-url');
formEditAvatar.addEventListener('submit', handleFormAvatar);

function handleFormAvatar(evt) {
  evt.preventDefault();
  editUserAvatar(avatarInput.value);
  editAvatarButton.style.backgroundImage = `url(${avatarInput.value})`;
  closeModal(evt.target.closest('.popup_type_edit_avatar'));
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

const toIdArray = (array) => {
  return Array.from(array).map(like => like._id)
}

/* publish cards */

fetch(cardServerLink, {
  method: 'GET',
  headers: {
    authorization: token
  }
})
.then(res => res.json())
.then((result) => {
  result.reverse();
  result.forEach(card => {
    const whoLiked = toIdArray(card.likes);
    publishCardLocal(card.name, card.link, card.owner._id, card._id, whoLiked);
  })
});


const addNewCardRemote = (cardName, cardURL) => {
  fetch(cardServerLink, {
    method: 'POST',
    body: JSON.stringify({
      name: cardName,
      link: cardURL
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((card) => {
    publishCardLocal (cardName, cardURL, myId, card._id, toIdArray(card.likes));
  });  
}


function deleteCardRemote(cardId) {
  fetch(`${cardServerLink}${cardId}`, {
    method: 'DELETE',    
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result.cardId);
  });  
}

const startLike = (cardId) => {
  fetch(`${cardServerLink}/likes/${cardId}`, {
    method: 'PUT',    
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });  
}

const stopLike = (cardId) => {
  fetch(`${cardServerLink}/likes/${cardId}`, {
    method: 'DELETE',    
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });  
}


/* TODO

saving animation
*/