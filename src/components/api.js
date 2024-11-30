const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: 'b4ccb494-d10e-4dc4-80ce-41c10ff84550',
    'Content-Type': 'application/json'
  },
  myId :'3ddd768593f43d868606cab2',
}


const updateUserInfo = (profileName, profileDescription, editAvatarButton) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'GET', 
    headers: config.headers
  })
  .then(res => res.json())
  .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    editAvatarButton.style.backgroundImage = `url(${user.avatar})`;
  })
}


const editUserInfo = (newName, newDescription, profileName, profileDescription, editModal, formEditProfileButton, closeModal) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then(res => res.json())
  .then((user) => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;

    closeModal(editModal.closest('.popup_type_edit'));
  })
  .catch(err => console.log(err))
  .finally(() => {
    formEditProfileButton.textContent = 'Сохранить';
  });
}


const addNewCardRemote = (placeInput, linkInput, formNewPlaceButton, newCardModal, publishCardLocal, closeModal) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: placeInput.value,
      link: linkInput.value,
    }),
    headers: config.headers
  })
  .then(res => res.json())
  .then((card) => {
    publishCardLocal (placeInput.value, linkInput.value, config.myId, card._id, toIdArray(card.likes));
    placeInput.value = '';
    linkInput.value = '';
    closeModal(newCardModal);
  })
  .catch(err => console.log('ошибка',err))
  .finally(() => {
    formNewPlaceButton.textContent = 'Сохранить';
  })
  ;  
}


function deleteCardRemote(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',    
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result.cardId);
  });  
}

const getCardsFromServer = (publishCardLocal) =>
  fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    result.reverse();
    result.forEach(card => {
      const whoLiked = toIdArray(card.likes);
      publishCardLocal(card.name, card.link, card.owner._id, card._id, whoLiked);
      console.log(card._id);
    })
  });

const editUserAvatar = (avatarInput,editAvatarButton,editAvatarFormButton, evt, closeModal) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
  .then(res => res.json())
  .then((res) => {
    editAvatarButton.style.backgroundImage = `url(${avatarInput.value})`;
    closeModal(evt.target.closest('.popup_type_edit_avatar'));
  })
  .catch(err => console.log(err))
  .finally(() => {
    editAvatarFormButton.textContent = 'Сохранить';
  })
  ;
}



const startLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',    
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });  
}


const stopLike = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',    
    headers: config.headers
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });  
}

const toIdArray = (array) => {
  return Array.from(array).map(like => like._id)
}

export {
  updateUserInfo, 
  editUserInfo, 
  addNewCardRemote, 
  deleteCardRemote, 
  getCardsFromServer,
  editUserAvatar,
  startLike,
  stopLike,
};