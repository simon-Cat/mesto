// Импорт классов Section, Card и FormValidator
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

// Импорт констант
import { config, initialCards } from '../utils/constants.js';

// Импорт стилей
import '../styles/index.css';

// Удаляем класс "popup_hidden" у всех блоков popup.
// Сделано с целью скрыть исчезающий popup во время презагрузки страницы
window.addEventListener('load', () => {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popup) => {
    popup.classList.remove('popup_hidden');
  });
});

// валидация формы профиля
const formUserData = new FormValidator(config, '.form_userData');
formUserData.enableValidation();

// валидация формы создания карточек
const formPlaceData = new FormValidator(config, '.form_placeData');
formPlaceData.enableValidation();

// КЛАСС POPUP ДЛЯ ПРОФИЛЯ
const popupEdit = new PopupWithForm('.popup_type_edit', saveProfileChanges);
popupEdit.setEventListeners();

// КЛАСС POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
const popupAdd = new PopupWithForm('.popup_type_add', addPlaceNewCard);
popupAdd.setEventListeners();

// КЛАСС POPUP ДЛЯ ПОЛНОГО ИЗОБРАЖЕНИЯ
const popupFullImage = new PopupWithImage('.popup_type_full-image');
popupFullImage.setEventListeners();

// КЛАСС USERINFO
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userPostSelector: '.profile__description',
});

// блок profile
const profile = document.querySelector('.profile');

// элемент "title" в блоке profile
const profileTitle = profile.querySelector('.profile__title');

// элемент "description" в блоке profile
const profileDescription = profile.querySelector('.profile__description');

// элемент кнопки "редактировать" в блоке profile
const profileEditButton = profile.querySelector('.button_type_edit');

// элемент кнопки "Добавить изображение" в блоке place
const placeAddButton = profile.querySelector('.button_type_add');

// форма блока popup для редактирование данных профиля
const popupFormEdit = document.querySelector('.popup_type_edit .popup__form');

// input с именем
const inputProfileName = document.querySelector('.form__input_type_name');

// input с должностью
const inputProfilePost = document.querySelector('.form__input_type_post');

// ЭКЗЕМПЛЯР КЛАССА SECTION
const cardList = new Section(
  {
    items: initialCards,
    renderer: addPlaceNewCard,
  },
  '.places__list'
);
// ОТРИСОВАТЬ ВСЕ КАРТОЧКИ
cardList.renderElements();

// установить данные в полях input в блоке profile
// открыть popup
function setInitialProfileData() {
  const { userName, userPost } = userInfo.getUserInfo();
  // console.log(test);

  inputProfileName.value = userName;
  inputProfilePost.value = userPost;

  // проверяем форму при открытии popup профиля
  formUserData.checkInputValidity(inputProfileName);
  formUserData.checkInputValidity(inputProfilePost);
  formUserData.toggleButtonState();

  popupEdit.open();
}

// сохранить изменения профиля
function saveProfileChanges({ userName, userPost }) {
  userInfo.setUserInfo(userName, userPost);
  // profileTitle.textContent = userName;
  // profileDescription.textContent = userPost;
}

// добавление новой карочки "места"
// убрал первый аргумент evt
function addPlaceNewCard(initialPlace) {
  const placeNewCard = createPlaceCard(initialPlace);
  formPlaceData.toggleButtonState();

  // Добавление элемента списка li с блоком place в блок places__list
  cardList.addItem(placeNewCard);
}

function createPlaceCard(initialPlace) {
  // переменная для хранения новой карточки
  const placeNewCard = new Card(
    initialPlace,
    '#place',
    popupFullImage.open.bind(popupFullImage)
  ).generateCard();
  return placeNewCard;
}

// очистить форму
function clearForm(form) {
  form.reset();
}

// вешаем события для кнопок: "редактировать", "добавить", "закрыть"
profileEditButton.addEventListener('click', setInitialProfileData);
placeAddButton.addEventListener('click', () => {
  // блокируем кнопку формы создания новых карточек
  formPlaceData.toggleButtonState();
  // openPopup(popupBlockAdd);
  popupAdd.open();
});

// вешаем события для форм: "сохранить изменения", "добавить новое место"
// popupFormEdit.addEventListener('submit', saveProfileChanges);
// popupFormAdd.addEventListener('submit', addPlaceNewCard);
