// Импорт классов Section, Card и FormValidator
import Popup from '../components/Popup.js';
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
const popupEdit = new Popup('.popup_type_edit');
popupEdit.setEventListeners();

// КЛАСС POPUP ДЛЯ ДОБАВЛЕНИЯ КАРТОЧКИ
const popupAdd = new Popup('.popup_type_add');
popupAdd.setEventListeners();

// КЛАСС POPUP ДЛЯ ПОЛНОГО ИЗОБРАЖЕНИЯ
const popupFullImage = new Popup('.popup_type_full-image');
popupFullImage.setEventListeners();

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

// блок popup для редактирование данных профиля
const popupBlockEdit = document.querySelector('.popup_type_edit');

// форма блока popup для редактирование данных профиля
const popupFormEdit = document.querySelector('.popup_type_edit .popup__form');

// блок popup для добавления новых фотографий
const popupBlockAdd = document.querySelector('.popup_type_add');

// форма блока popup для добавления новых фотографий
const popupFormAdd = document.querySelector('.popup_type_add .popup__form');

// элемент кнопки "закрыть" в блоке popup
const popupCloseButtons = Array.from(
  document.querySelectorAll('.button_type_close')
);

// input с именем
const inputProfileName = document.querySelector('.form__input_type_name');

// input с должностью
const inputProfilePost = document.querySelector('.form__input_type_post');

// input с "названием места"
const inputPlaceName = document.querySelector('.form__input_type_place-name');

// input "ссылка на изображение"
const inputPlaceSource = document.querySelector(
  '.form__input_type_place-source'
);

// отобразить 6 начальных карточек "мест"
function addInitialPlaceCards(evt) {
  initialCards.forEach((item) => {
    addPlaceNewCard(evt, item);
  });
}
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
  inputProfileName.value = profileTitle.textContent;
  inputProfilePost.value = profileDescription.textContent;

  // проверяем форму при открытии popup профиля
  formUserData.checkInputValidity(inputProfileName);
  formUserData.checkInputValidity(inputProfilePost);
  formUserData.toggleButtonState();

  popupEdit.open();
}

// сохранить изменения профиля
function saveProfileChanges(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfilePost.value;

  // закрыть popup
  popupEdit.close();

  // очистить поля input
  clearForm(popupFormEdit);
}

// добавление новой карочки "места"
// убрал первый аргумент evt
function addPlaceNewCard(initialPlace) {
  const placeNewCard = createPlaceCard(initialPlace);
  formPlaceData.toggleButtonState();

  // Добавление элемента списка li с блоком place в блок places__list
  cardList.addItem(placeNewCard);

  // если есть объект "evt", то закрываем popup через функцию
  // if (evt) {
  //   evt.preventDefault();
  //   closePopup(evt);
  // }

  // очистить поля input
  clearForm(popupFormAdd);
}

function createPlaceCard(initialPlace) {
  // переменная для хранения новой карточки
  let placeNewCard;

  // если передан объект данных "места" из массива "initialCards",
  // то пр создании экземпляра используем его
  if (initialPlace) {
    placeNewCard = new Card(
      initialPlace,
      '#place',
      popupFullImage.open.bind(popupFullImage)
    ).generateCard();
  } else {
    // иначе получаем значения из полей input и при создании
    // экземпляра перелаем объект данных
    const placeName = inputPlaceName.value;
    const placeSource = inputPlaceSource.value;

    placeNewCard = new Card(
      { name: placeName, link: placeSource },
      '#place',
      // openPopup
      popupAdd.open
    ).generateCard();
  }
  return placeNewCard;
}

// очистить форму
function clearForm(form) {
  form.reset();
}

// закрытие popup через оверлей
// function closePopupWithOverlay(evt) {
//   if (evt.target.classList.contains('popup__container')) {
//     closePopup(evt);
//   }

//   return;
// }

// добавить слушатель на нажатие кнопки ESC
// function setKeyboardEvent() {
//   document.addEventListener('keydown', closePopupWithEscapeKey);
// }

// удалить слушатель на нажатие кнопки ESC
// function removeKeyboardEvent() {
//   document.removeEventListener('keydown', closePopupWithEscapeKey);
// }

// закрытие popup через клавишу ESC
// function closePopupWithEscapeKey(evt) {
//   if (evt.keyCode === keyCodeESC) {
//     removeKeyboardEvent();

//     const popupClosed = document.querySelector('.popup_opened');

//     popupClosed.classList.remove('popup_opened');
//   }
// }

// добавляем 6 первых карточек
// addInitialPlaceCards();

// вешаем события для кнопок: "редактировать", "добавить", "закрыть"
profileEditButton.addEventListener('click', setInitialProfileData);
placeAddButton.addEventListener('click', () => {
  // блокируем кнопку формы создания новых карточек
  formPlaceData.toggleButtonState();
  // openPopup(popupBlockAdd);
  popupAdd.open();
});
// popupCloseButtons.forEach((item) => {
//   item.addEventListener('click', closePopup);
// });

// закрытие popup через оверлей
// document.addEventListener('mousedown', closePopupWithOverlay);

// вешаем события для форм: "сохранить изменения", "добавить новое место"
popupFormEdit.addEventListener('submit', saveProfileChanges);
popupFormAdd.addEventListener('submit', addPlaceNewCard);
