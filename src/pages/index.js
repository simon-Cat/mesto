// Импорт классов
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// Импорт констант
import {
  config,
  initialCards,
  profileEditButton,
  placeAddButton,
  inputProfileName,
  inputProfilePost,
} from '../utils/constants.js';

// Импорт стилей
import './index.css';

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

// класс Popup для профиля пользователя
const popupEdit = new PopupWithForm('.popup_type_edit', saveProfileChanges);
popupEdit.setEventListeners();

// класс Popup для добавления карточки
const popupAdd = new PopupWithForm('.popup_type_add', addPlaceNewCard);
popupAdd.setEventListeners();

// класс Popup для отображения полномасштабного изображения
const popupFullImage = new PopupWithImage('.popup_type_full-image');
popupFullImage.setEventListeners();

// класс UserInfo для управения отображения
// данных пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userPostSelector: '.profile__description',
});

// класс Section для отрисвоки элементов
const cardList = new Section(
  {
    items: initialCards,
    renderer: addPlaceNewCard,
  },
  '.places__list'
);

// отрисовать все карточки мест
cardList.renderElements();

// установить данные в полях input в блоке profile
// осущетсвить валидацию полей формы
// открыть popup
function setInitialProfileData() {
  // получаем объект данных пользователя
  const { userName, userPost } = userInfo.getUserInfo();

  // отобразить данные в инпутах
  inputProfileName.value = userName;
  inputProfilePost.value = userPost;

  // сбрасываем валидацию у формы при открытии попапа профиля
  formUserData.resetForm();

  formUserData.toggleButtonState();

  // открыть popup
  popupEdit.open();
}

// сохранить изменения профиля
function saveProfileChanges({ userName, userPost }) {
  userInfo.setUserInfo(userName, userPost);
}

// добавление новой карочки "места"
function addPlaceNewCard(initialPlace) {
  // создание новой карточки
  const placeNewCard = createPlaceCard(initialPlace);

  // валидация кнопки
  formPlaceData.toggleButtonState();

  // Добавление карточки на страницу
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

// вешаем события для кнопок: "редактировать", "добавить"
profileEditButton.addEventListener('click', setInitialProfileData);
placeAddButton.addEventListener('click', () => {
  // блокируем кнопку формы создания новых карточек
  formPlaceData.toggleButtonState();
  popupAdd.open();
});
