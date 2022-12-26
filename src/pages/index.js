// Импорт классов
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

// Импорт констант
import {
  config,
  profileAvatarEditButton,
  profileEditButton,
  placeAddButton,
  inputProfileName,
  inputProfilePost,
} from '../utils/constants.js';

// Импорт стилей
import './index.css';
import { data } from 'autoprefixer';

// Удаляем класс "popup_hidden" у всех блоков popup.
// Сделано с целью скрыть исчезающий popup во время презагрузки страницы
window.addEventListener('load', () => {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.classList.remove('popup_hidden');
  });
});

// наш ID
const USER_DATA = {
  id: null,
};

// Api class
const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: 'bc0c38b3-5c70-4885-820d-3321ddcd1680',
    'Content-Type': 'application/json',
  },
});

// класс UserInfo для управения отображения
// данных пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userPostSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
});

// загрузить данные пользователя с сервера
// отрисовать их на странице
// отрисовать все карточки мест
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{ name, about, avatar, _id }, cards]) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserInfoAvatar(avatar);
    USER_DATA.id = _id;
    cardList.renderElements(cards.reverse());
  })
  .catch((err) => console.log(err));

// валидация формы профиля
const formUserData = new FormValidator(config, '.form_userData');
formUserData.enableValidation();

// валидация формы создания карточек
const formPlaceData = new FormValidator(config, '.form_placeData');
formPlaceData.enableValidation();

// валидация формы аватарки профиля
const formUserAvatar = new FormValidator(config, '.form_userAvatar');
formUserAvatar.enableValidation();

// класс Popup для профиля пользователя
const popupEditUserInfo = new PopupWithForm(
  '.popup_type_edit',
  saveProfileChanges
);
popupEditUserInfo.setEventListeners();

// класс Popup для добавления карточки
const popupAddNewCard = new PopupWithForm('.popup_type_add', addPlaceNewCard);
popupAddNewCard.setEventListeners();

// класс Popup для отображения полномасштабного изображения
const popupFullImage = new PopupWithImage('.popup_type_full-image');
popupFullImage.setEventListeners();

// подтверждение удаления карточки
const popupConfirm = new PopupConfirm('.popup_type_confirm', confirmRemoveCard);
popupConfirm.setEventListeners();

// класс Popup для обновления аватарки
const popupEditUserAvatar = new PopupWithForm(
  '.popup_type_avatar',
  saveProfileAvatarChanges
);
popupEditUserAvatar.setEventListeners();

// класс Section для отрисвоки элементов
const cardList = new Section(
  {
    renderer: renderInitialPlaceCard,
  },
  '.places__list'
);

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
  popupEditUserInfo.open();
}

// отправить новые данные профиля на сервер
// отрисовать новые данные профиля
function saveProfileChanges({ userName, userPost }) {
  api
    .updateProfileInfo(userName, userPost)
    .then(({ name, about }) => {
      userInfo.setUserInfo(name, about);
    })
    .finally(() => {
      popupEditUserInfo.close();
      popupEditUserInfo.toggleLoader(false);
    })
    .catch((err) => console.log(err));
}

// отправить новую аватарку профиля на сервер
// отрисовать новые аватарку профиля
function saveProfileAvatarChanges({ avatar }) {
  api
    .updateProfileAvatar(avatar)
    .then(({ avatar }) => {
      userInfo.setUserInfoAvatar(avatar);
    })
    .finally(() => {
      popupEditUserAvatar.close();
      popupEditUserAvatar.toggleLoader(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

// отрисовать начальные карточки
function renderInitialPlaceCard(initialPlace) {
  // создание новой карточки
  const placeNewCard = createPlaceCard(initialPlace);

  // валидация кнопки
  formPlaceData.toggleButtonState();

  // Добавление карточки на страницу
  cardList.addItem(placeNewCard);
}

// добавление новой карочки "места"
function addPlaceNewCard(newCard) {
  api
    .sendNewCard(newCard)
    .then((data) => {
      const placeNewCard = createPlaceCard(data);
      formPlaceData.toggleButtonState();
      cardList.addItem(placeNewCard);
    })
    .finally(() => {
      popupAddNewCard.close();
      popupAddNewCard.toggleLoader(false);
    })
    .catch((err) => console.log(err));
}

// отметить добавление лайка на сервере
// отрисовать его на странице
function sendLike(cardId, likesCount, likesCountElement, rendererLikesCount) {
  api
    .sendLike(cardId, likesCount)
    .then((data) => {
      likesCountElement.textContent = data.likes.length;
      rendererLikesCount();
    })
    .catch((err) => console.log(err));
}

// отметить удаление лайка на сервере
// отрисовать его на странице
function deleteLike(cardId, likesCount, likesCountElement, rendererLikesCount) {
  api
    .deleteLike(cardId, likesCount)
    .then((data) => {
      likesCountElement.textContent = data.likes.length;
      rendererLikesCount();
    })
    .catch((err) => console.log(err));
}

// удалить карточку из БД
// удалить карточку со страницы
// закрыть попап
function confirmRemoveCard(cardId, removeCardHandler) {
  api
    .deleteCard(cardId)
    .then(() => {
      removeCardHandler();
      popupConfirm.close();
    })
    .catch((err) => console.log(err));
}

function createPlaceCard(card) {
  // переменная для хранения новой карточки
  const placeNewCard = new Card(
    card,
    USER_DATA.id,
    '#place',
    popupFullImage.open.bind(popupFullImage),
    popupConfirm.getCardID.bind(popupConfirm),
    popupConfirm.getRemoveFn.bind(popupConfirm),
    sendLike,
    deleteLike
  ).generateCard();

  return placeNewCard;
}

// вешаем события для кнопок: "редактировать", "добавить"
profileEditButton.addEventListener('click', setInitialProfileData);
placeAddButton.addEventListener('click', () => {
  // блокируем кнопку формы создания новых карточек
  formPlaceData.toggleButtonState();
  popupAddNewCard.open();
});
profileAvatarEditButton.addEventListener('click', () => {
  formUserAvatar.toggleButtonState();
  popupEditUserAvatar.open();
});
