// Импорт изображений начальных карточек
import imgAbkhazia from '../images/abkhazia.jpg';
import imgKrasnodar from '../images/krasnodar.jpg';
import imgMoscow from '../images/moscow.jpg';
import imgNovorossysk from '../images/novorossysk.jpg';
import imgSochi from '../images/sochi.jpg';
import imgStPeterburg from '../images/st-peterburg.jpg';

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

// 6 карточек при загрузке страницы
const initialCards = [
  { name: 'Абхазия', link: imgAbkhazia },
  { name: 'Краснодар', link: imgKrasnodar },
  { name: 'Москва', link: imgMoscow },
  { name: 'Новороссийск', link: imgNovorossysk },
  { name: 'Сочи', link: imgSochi },
  { name: 'Санкт-Петербург', link: imgStPeterburg },
];

const profileEditButton = document.querySelector('.button_type_edit'),
  placeAddButton = document.querySelector('.button_type_add'),
  inputProfileName = document.querySelector('.form__input_type_name'),
  inputProfilePost = document.querySelector('.form__input_type_post'),
  avatarProfile = document.querySelector('.profile__avatar');

export {
  config,
  initialCards,
  profileEditButton,
  placeAddButton,
  inputProfileName,
  inputProfilePost,
  avatarProfile,
};
