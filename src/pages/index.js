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
api
  .getUserInfo()
  .then(({ name, about, avatar, _id }) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserInfoAvatar(avatar);
    // сохранить наш ID в переменную
    USER_DATA.id = _id;
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
const popupConfirm = new PopupConfirm(
  '.popup_type_confirm',
  api.deleteCard.bind(api)
);
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
    renderer: addPlaceNewCard,
  },
  '.places__list'
);

// отрисовать все карточки мест
api
  .getInitialCards()
  .then((cards) => {
    cardList.renderElements(cards.reverse());
  })
  .catch((err) => console.log(err));

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

// добавление новой карочки "места"
function addPlaceNewCard(initialPlace) {
  // если создается новая карточка, то
  // отправить ее на сервер
  if (!('owner' in initialPlace)) {
    api
      .sendNewCard(initialPlace)
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
    USER_DATA.id,
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
  popupAddNewCard.open();
});
profileAvatarEditButton.addEventListener('click', () => {
  formUserAvatar.toggleButtonState();
  popupEditUserAvatar.open();
});
