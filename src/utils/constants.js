// объект с наименованиями свойств
const config = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorElementSelector: '.form__input-error',
  inputErrorElementClass: 'form__input-error_type_visible',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_disabled',
};

const profileAvatarEditButton = document.querySelector('.profile__edit-avatar'),
  profileEditButton = document.querySelector('.button_type_edit'),
  placeAddButton = document.querySelector('.button_type_add'),
  inputProfileName = document.querySelector('.form__input_type_name'),
  inputProfilePost = document.querySelector('.form__input_type_post');

export {
  config,
  profileAvatarEditButton,
  profileEditButton,
  placeAddButton,
  inputProfileName,
  inputProfilePost,
};
