const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-27',
  headers: {
    authorization: 'b4ccb494-d10e-4dc4-80ce-41c10ff84550',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};


const updateUserInfo = () => 
  fetch(`${config.baseUrl}/users/me`, {
    method: 'GET', 
    headers: config.headers
  })
  .then(res => handleResponse(res))


const editUserInfo = (newName, newDescription) => 
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then(res => handleResponse(res))


const addNewCardRemote = (placeName, placeLink) => 
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: placeName,
      link: placeLink,
    }),
    headers: config.headers
  })
  .then(res => handleResponse(res))


const deleteCardRemote =(card, cardId) => 
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',    
    headers: config.headers
  })
  .then(res => handleResponse(res))  


const getCardsFromServer = () =>
  fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => handleResponse(res))


const editUserAvatar = (avatarLink) => 
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => handleResponse(res))  


const startLike = (cardId) => 
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',    
    headers: config.headers
  })
  .then(res => handleResponse(res))


const stopLike = (cardId) => 
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',    
    headers: config.headers
  })
  .then(res => handleResponse(res))   


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