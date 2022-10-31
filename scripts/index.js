// Удаляем класс "popup_hidden" у всех блоков popup.
// Сделано с целью скрыть исчезающий popup во время презагрузки страницы
window.addEventListener('load', () => {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach((popup) => {
    popup.classList.remove('popup_hidden');
  });
});

// блок places__list
const placesList = document.querySelector('.places__list');

// блок profile
const profile = document.querySelector('.profile');

// элемент "title" в блоке profile
const profileTitle = profile.querySelector('.profile__title');

// элемент "description" в блоке profile
const profileDescription = profile.querySelector('.profile__description');

// элемент кнопки "редактировать" в блоке profile
const profileEditButton = profile.querySelector('.button_type_edit');

// элемент кнопки "Добавить изображение" в блоке profile
const profileAddButton = profile.querySelector('.button_type_add');

// блок popup для редактирование данных профиля
const popupBlockEdit = document.querySelector('.popup_type_edit');

// форма блока popup для редактирование данных профиля
const popupFormEdit = document.querySelector('.popup_type_edit .popup__form');

// блок popup для добавления новых фотографий
const popupBlockAdd = document.querySelector('.popup_type_add');

// форма блока popup для добавления новых фотографий
const popupFormAdd = document.querySelector('.popup_type_add .popup__form');

// блок popup для отображения изображения места в полный размер
const popupBlockFullImage = document.querySelector('.popup_type_full-image');

// полное изображение блока popup
const popupBlockFullImageSource = document.querySelector('.popup__full-image');

// подпись для полного изображения
const popupBlockFullImageText = document.querySelector('.popup__text');

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

// код клавиши ESC
const keyCodeESC = 27;

// отобразить 6 начальных карточек "мест"
function addInitialPlaceCards(evt) {
  initialCards.forEach((item) => {
    addplaceNewCard(evt, item);
  });
}

// открыть popup
function openPopup(popupBlock) {
  setKeyboardEvent();

  popupBlock.classList.add('popup_opened');
}

// закрыть popup
function closePopup(evt) {
  removeKeyboardEvent();

  const popupClosedBlock = evt.target.closest('.popup');
  popupClosedBlock.classList.remove('popup_opened');
}

// установить данные в полях input в блоке profile
// открыть popup
function setInitialProfileData() {
  inputProfileName.value = profileTitle.textContent;
  inputProfilePost.value = profileDescription.textContent;

  // проверка полей формы "Редактировать профиль"
  checkInputValidity(popupFormEdit, inputProfileName, config);
  checkInputValidity(popupFormEdit, inputProfilePost, config);

  openPopup(popupBlockEdit);
}

// сохранить изменения профиля
function saveProfileChanges(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfilePost.value;

  // закрыть popup
  closePopup(evt);

  // очистить поля input
  clearInputFields(inputProfileName, inputProfilePost);
}

// добавление новой карочки "места"
function addplaceNewCard(evt, initialPlace) {
  const placeNewCard = createPlaceCard(initialPlace);

  // Добавление элемента списка li с блоком place в блок places__list
  placesList.prepend(placeNewCard);

  // если есть объект "evt", то закрываем popup через функцию
  if (evt) {
    evt.preventDefault();
    closePopup(evt);
  }

  // очистить поля input
  clearInputFields(inputPlaceName, inputPlaceSource);
}

function createPlaceCard(initialPlace) {
  // переменные для хранения названия места и
  // ссылки на его изображение
  let placeName = null;
  let placeSource = null;

  // если передано "место" из массива "initialCards",
  // то в переменные сохраняем значения свойств "name" и "link",
  // иначе сохраняем значения из полей input
  if (initialPlace) {
    placeName = initialPlace.name;
    placeSource = initialPlace.link;
  } else {
    placeName = inputPlaceName.value;
    placeSource = inputPlaceSource.value;
  }

  // клон template блока place
  const placeTemplate = document
    .querySelector('#place')
    .content.cloneNode(true);

  // элемент списка li
  const placeListItem = placeTemplate.querySelector('li');

  // блок place
  const placeCard = placeTemplate.querySelector('.place');

  // элемент img блока place
  const placeImage = placeCard.querySelector('.place__image');

  // атрибуты src и alt для элемента place__image
  placeImage.setAttribute('alt', placeName);
  placeImage.setAttribute('src', placeSource);

  // установить атрибуты для изображения и текст для подписи к изображению
  // открыть popup с увеличеным изображением
  placeImage.addEventListener('click', () => {
    popupBlockFullImageSource.setAttribute('src', placeSource);
    popupBlockFullImageSource.setAttribute('alt', placeName);
    popupBlockFullImageText.textContent = placeName;

    openPopup(popupBlockFullImage);
  });

  // элемент title блока place
  const placeTitle = placeCard.querySelector('.place__title');

  // текст для элемента place__title
  placeTitle.textContent = placeName;

  // кнопка "like" и обработчик события к ней
  const buttonLike = placeCard.querySelector('.button_type_like');
  buttonLike.addEventListener('click', like);

  // кнопка "remove" и обработчик события к ней
  const buttonRemove = placeCard.querySelector('.button_type_remove');
  buttonRemove.addEventListener('click', removePlaceCard);

  return placeListItem;
}

// поставить/убрать "like"
function like(evt) {
  const buttonLike = evt.target;
  buttonLike.classList.toggle('button_active');
}

// удалить карточку "место"
function removePlaceCard(evt) {
  const placeRemovedCard = evt.target.closest('li');
  placeRemovedCard.remove();
}

// удалить значения полей input
function clearInputFields(inputField_1, inputField_2) {
  inputField_1.value = null;
  inputField_2.value = null;
}

// закрытие popup через оверлей
function closePopupWithOverlay(evt) {
  if (evt.target.classList.contains('popup__container')) {
    closePopup(evt);
  }

  return;
}

// добавить слушатель на нажатие кнопки ESC
function setKeyboardEvent() {
  document.addEventListener('keydown', closePopupWithEscapeKey);
}

// удалить слушатель на нажатие кнопки ESC
function removeKeyboardEvent() {
  document.removeEventListener('keydown', closePopupWithEscapeKey);
}

// закрытие popup через клавишу ESC
function closePopupWithEscapeKey(evt) {
  if (evt.keyCode === keyCodeESC) {
    removeKeyboardEvent();

    const popupClosed = document.querySelector('.popup_opened');

    popupClosed.classList.remove('popup_opened');
  }
}

// добавляем 6 первых карточек
addInitialPlaceCards();

// вешаем события для кнопок: "редактировать", "добавить", "закрыть"
profileEditButton.addEventListener('click', setInitialProfileData);
profileAddButton.addEventListener('click', () => openPopup(popupBlockAdd));
popupCloseButtons.forEach((item) => {
  item.addEventListener('click', closePopup);
});

// закрытие popup через оверлей
document.addEventListener('mousedown', closePopupWithOverlay);

// вешаем события для форм: "сохранить изменения", "добавить новое место"
popupFormEdit.addEventListener('submit', saveProfileChanges);
popupFormAdd.addEventListener('submit', addplaceNewCard);

enableValidation(config);
