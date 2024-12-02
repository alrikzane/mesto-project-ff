import './pages/index.css';
import {openModal, closeModal} from './components/modal';
import {getCard} from './components/card';
import {enableValidation, clearValidation} from './components/validation';
import {
  updateUserInfo, 
  editUserInfo, 
  addNewCardRemote, 
  deleteCardRemote, 
  getCardsFromServer,
  editUserAvatar,
  startLike, 
  stopLike} from './components/api';
const galleryList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const img = imageModal.querySelector('.popup__image');
const caption = imageModal.querySelector('.popup__caption');
const editAvatarModal = document.querySelector('.popup_type_edit_avatar');
const editAvatarButton = document.querySelector('.profile__image');
const editAvatarButtonCover = editAvatarButton.querySelector('.profile__image__overlay');
const formEditProfile = editModal.querySelector('.popup__form');
const formEditProfileButton = formEditProfile.querySelector('.popup__button');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


editAvatarButton.addEventListener('mouseover', () => {
  editAvatarButtonCover.style.display = 'flex';
})
editAvatarButton.addEventListener('mouseout', () => {
  editAvatarButtonCover.style.display = 'none';
})
editAvatarButton.addEventListener('click', () => openModal(editAvatarModal));

let myId;
Promise.all([
  updateUserInfo(),
  getCardsFromServer()  
])
.then((array) =>{
  const [currentUser, cards] = array;
  myId = currentUser._id;
  profileName.textContent = currentUser.name;
  profileDescription.textContent = currentUser.about;
  editAvatarButton.style.backgroundImage = `url(${currentUser.avatar})`;
  cards.reverse();
  cards.forEach(card => {
    publishCardLocal(card.name, card.link, card.owner._id, card._id, card.likes);
  })  
})
.catch(err => console.log(err));

profileEditButton.addEventListener('click', () => {
  fillProfileModal();
  clearValidation(editModal, validationSelectors);
  openModal(editModal);
});
newCardButton.addEventListener('click', () => openModal(newCardModal));

const resetForm = (modal) => {
  modal.querySelector('.popup__form').reset();
  clearValidation(modal, validationSelectors);
}

[editModal, newCardModal, editAvatarModal].forEach(modal => {
  modal.addEventListener('mousedown', evt => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
      closeModal(modal);
      resetForm(modal);      
    }
  });
});

imageModal.addEventListener('mousedown', evt => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closeModal(imageModal);     
  }
});

const zoomImage = (evt) => {
  openModal(imageModal);    
  img.src = evt.target.src;
  img.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
}

const deletecardCallback = (card, cardId) => {
  deleteCardRemote(card, cardId)
  .then(() => {card.remove()})
  .catch(err => console.log(err))
}


function handleLike(evt, cardId, likesCounter) {
  if (evt.target.classList.contains('card__like-button')) {
    const likeButton = evt.target;
    if (evt.target.classList.contains('card__like-button_is-active')) {
      stopLike(cardId)
      .then((result) => {
        likesCounter.innerText = result.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.log(err));
    } else {
      startLike(cardId)
      .then((result) => {
        likesCounter.innerText = result.likes.length;
        likeButton.classList.toggle('card__like-button_is-active');
      })
      .catch(err => console.log(err));
    }    
  }  
}

function publishCardLocal(name, link, ownerId, cardId, likes) {
  galleryList.prepend(getCard({
    name: name,
    link: link,
    ownerId: ownerId,
    cardId: cardId,
    likes: likes
  },
    myId, zoomImage, deletecardCallback, handleLike));
}



/* Add new place form block */

const formNewPlace = newCardModal.querySelector('.popup__form');
const formNewPlaceButton = formNewPlace.querySelector('.popup__button');
const placeInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');

formNewPlace.addEventListener('submit', handleFormCard);

function handleFormCard(evt) {
  evt.preventDefault();
  formNewPlaceButton.textContent = 'Сохраняем...';
  addNewCardRemote(placeInput.value, linkInput.value)
  .then((card) => {
    publishCardLocal (card.name, card.link, myId, card._id, card.likes);
    placeInput.value = '';
    linkInput.value = '';
    closeModal(newCardModal);
    resetForm(newCardModal);
  })
  .catch(err => console.log('ошибка',err))
  .finally(() => {
    formNewPlaceButton.textContent = 'Сохранить';
  });
}

/* Edit profile form block */

formEditProfile.addEventListener('submit', handleFormProfile);

function handleFormProfile(evt) {
  evt.preventDefault();
  formEditProfileButton.textContent = 'Сохраняем...';
  editUserInfo(nameInput.value, jobInput.value)
  .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    closeModal(editModal.closest('.popup_type_edit'));
    resetForm(editModal.closest('.popup_type_edit'));
  })
  .catch(err => console.log(err))
  .finally(() => {
    formEditProfileButton.textContent = 'Сохранить';
  });
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
  const editAvatarFormButton = formEditAvatar.querySelector('.popup__button');
  editAvatarFormButton.textContent = 'Сохраняем...';
  editUserAvatar(avatarInput.value)
  .then((res) => {
    editAvatarButton.style.backgroundImage = `url(${avatarInput.value})`;
    closeModal(evt.target.closest('.popup_type_edit_avatar'));
    resetForm(evt.target.closest('.popup_type_edit_avatar'));
  })
  .catch(err => console.log(err))
  .finally(() => {
    editAvatarFormButton.textContent = 'Сохранить';
  })  
}


/* Validation */



enableValidation(validationSelectors);



