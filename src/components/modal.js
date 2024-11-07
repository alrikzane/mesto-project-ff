const page = document.querySelector('.page');
const formEditProfile = document.getElementsByName('edit-profile')[0];
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const ProfileName = document.querySelector('.profile__title');
const ProfileDescription = document.querySelector('.profile__description');

const handleEscKey = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  page.addEventListener('keydown',handleEscKey);
  if (modal.classList.contains('popup_type_edit')){
    fillProfileModal();
  }
}

function openImageModal(evt, modal) {   
  if (evt.target.classList.contains('card__image')){
    openModal(modal);    
    const img = modal.querySelector('.popup__image');
    const caption = modal.querySelector('.popup__caption');
    img.src = evt.target.src;
    caption.textContent = evt.target.alt;
    
  }
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  page.removeEventListener('keydown',handleEscKey);
}

function closeImageModal(modal) {
  modal.classList.remove('popup_is-opened');
  page.removeEventListener('keydown',handleEscKey);
}

function fillProfileModal(){
  nameInput.value = ProfileName.textContent;
  jobInput.value = ProfileDescription.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  ProfileName.textContent = nameInput.value;
  ProfileDescription.textContent = jobInput.value;
  closeModal(evt.target.closest('.popup_type_edit'));
}

formEditProfile.addEventListener('submit', handleFormSubmit);

export {handleEscKey as handleEscKeyUp, openModal, closeModal, openImageModal, closeImageModal};


