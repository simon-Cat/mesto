// Импорт классов
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../utils/Api.js';

// Импорт констант
import {
  config,
  profileAvatarEditButton,
  profileEditButton,
  placeAddButton,
  inputProfileName,
  inputProfilePost,
  profileAvatar,
  profileName,
  profileAbout,
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

// Api class
const api = new Api({
  baseURL: 'https://nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: 'bc0c38b3-5c70-4885-820d-3321ddcd1680',
    'Content-Type': 'application/json',
  },
});

// загрузка данных пользователя
api.getUserInfo().then((res) => {
  profileAvatar.src = res.avatar;
  profileName.textContent = res.name;
  profileAbout.textContent = res.about;
});

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
const popupEdit = new PopupWithForm('.popup_type_edit', saveProfileChanges);
popupEdit.setEventListeners();

// класс Popup для добавления карточки
const popupAdd = new PopupWithForm('.popup_type_add', addPlaceNewCard);
popupAdd.setEventListeners();

// класс Popup для отображения полномасштабного изображения
const popupFullImage = new PopupWithImage('.popup_type_full-image');
popupFullImage.setEventListeners();

// подтверждение удаления карточки
const popupConfirm = new PopupConfirm(
  '.popup_type_confirm',
  api.deleteCard.bind(api)
);
popupConfirm.setEventListeners();

// класс UserInfo для управения отображения
// данных пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userPostSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar',
});

// класс Popup для обновления аватарки
const popupAvatarEdit = new PopupWithForm(
  '.popup_type_avatar',
  saveProfileAvatarChanges
);
popupAvatarEdit.setEventListeners();

// класс Section для отрисвоки элементов
const cardList = new Section(
  {
    renderer: addPlaceNewCard,
  },
  '.places__list'
);

// отрисовать все карточки мест
api.getInitialCards().then((res) => {
  cardList.renderElements(res.reverse());
});

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

// отправить новые данные профиля на сервер
// отрисовать новые данные профиля
function saveProfileChanges({ userName, userPost }) {
  api.updateProfileInfo(userName, userPost).then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  });
}

// отправить новую аватарку профиля на сервер
// отрисовать новые аватарку профиля
function saveProfileAvatarChanges({ avatar }) {
  api.updateProfileAvatar(avatar).then((userData) => {
    userInfo.setUserInfoAvatar(userData.avatar);
  });
}

// добавление новой карочки "места"
function addPlaceNewCard(initialPlace) {
  // если создается новая карточка, то
  // отправить ее на сервер
  if (!('owner' in initialPlace)) {
    api.sendNewCard(initialPlace).then((data) => {
      const placeNewCard = createPlaceCard(data);
      formPlaceData.toggleButtonState();
      cardList.addItem(placeNewCard);
    });
  } else {
    // создание новой карточки
    const placeNewCard = createPlaceCard(initialPlace);

    // валидация кнопки
    formPlaceData.toggleButtonState();

    // Добавление карточки на страницу
    cardList.addItem(placeNewCard);
  }
}

function createPlaceCard(initialPlace) {
  // переменная для хранения новой карточки
  const placeNewCard = new Card(
    initialPlace,
    '#place',
    popupFullImage.open.bind(popupFullImage),
    popupConfirm.getCardID.bind(popupConfirm),
    popupConfirm.getRemoveFn.bind(popupConfirm),
    api.sendLike.bind(api),
    api.deleteLike.bind(api)
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
profileAvatarEditButton.addEventListener('click', () => {
  formUserAvatar.toggleButtonState();
  popupAvatarEdit.open();
});
