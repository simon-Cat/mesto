// 6 карточек при загрузке страницы
const initialCards = [
  { name: 'Абхазия', link: '../images/abkhazia.jpg' },
  { name: 'Краснодар', link: '../images/krasnodar.jpg' },
  { name: 'Москва', link: '../images/moscow.jpg' },
  { name: 'Новороссийск', link: '../images/novorossysk.jpg' },
  { name: 'Сочи', link: '../images/sohi.jpg' },
  { name: 'Санкт-Петербург', link: '../images/st-peterburg.jpg' },
];

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

// блок popup
const popup = document.querySelector('.popup');

// блок popup для редактирование данных профиля
const popupBlockEdit = document.querySelector('.popup_type_edit');

// форма блока popup для редактирование данных профиля
const editPopupForm = popup.querySelector('.popup_type_edit .popup__form');

// блок popup для добавления новых фотографий
const popupBlockAdd = document.querySelector('.popup_type_add');

// форма блока popup для добавления новых фотографий
const addPopupForm = document.querySelector('.popup_type_add .popup__form');

// элемент кнопки "закрыть" в блоке popup
const popupCloseButton = Array.from(
  document.querySelectorAll('.button_type_close')
);

// input с именем
const inputName = document.querySelector('.form__input_type_name');

// input с должностью
const inputPost = document.querySelector('.form__input_type_post');

// input с "названием места"
const inputPlaceName = document.querySelector('.form__input_type_place-name');

// input "ссылка на изображение"
const inputPlaceSource = document.querySelector(
  '.form__input_type_place-source'
);

// отобразить 6 начальных карточек "мест"
function addInitialPlaceCard(evt) {
  initialCards.forEach((item) => {
    addNewPlaceCard(evt, item);
  });
}

addInitialPlaceCard();

// открыть popup
function openPopup(evt) {
  const eventButtonClasses = evt.target.classList;

  if (eventButtonClasses.contains('button_type_edit')) {
    inputName.value = profileTitle.textContent;
    inputPost.value = profileDescription.textContent;

    popupBlockEdit.classList.add('popup_opened');
  } else {
    popupBlockAdd.classList.add('popup_opened');
  }
}

// закрыть popup
function closePopup(evt) {
  const popupClosedBlock = evt.target.closest('.popup');
  popupClosedBlock.closest('.popup').classList.remove('popup_opened');
}

// сохранить изменения профиля
function saveProfileChanges(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputPost.value;

  closePopup(evt);
}

// добавление новой карочки "места"
function addNewPlaceCard(evt, place) {
  // переменные для хранения названия места и
  // ссылки на его изображение
  let placeName = null;
  let placeSource = null;

  // если передано "место" из массива "initialCards",
  // то в переменные сохраняем значения свойств "name" и "link",
  // иначе сохраняем значения из полей input
  if (place) {
    placeName = place.name;
    placeSource = place.link;
  } else {
    evt.preventDefault();
    placeName = inputPlaceName.value;
    placeSource = inputPlaceSource.value;
  }

  // клон template блока place
  const placeTemplate = document
    .querySelector('#place')
    .content.cloneNode(true);

  // блок place
  const placeCard = placeTemplate.querySelector('.place');

  // элемент img блока place
  const placeImage = placeCard.querySelector('.place__image');

  // атрибуты src и alt для элемента place__image
  placeImage.setAttribute('alt', placeName);
  placeImage.setAttribute('src', placeSource);

  // элемент title блока place
  const placeTitle = placeCard.querySelector('.place__title');

  // текст для элемента place__title
  placeTitle.textContent = placeName;

  // кнопка "like" и обработчик события к ней
  const likeButton = placeCard.querySelector('.button_type_like');
  likeButton.addEventListener('click', like);

  // кнопка "remove" и обработчик события к ней
  const removeButton = placeCard.querySelector('.button_type_remove');
  removeButton.addEventListener('click', removePlaceCard);

  // элемент списка li
  const listItem = document.createElement('li');

  // Добавление блока place в элемент списка li
  listItem.append(placeCard);

  // Добавление элемента списка li с блоком place в блок places__list
  placesList.prepend(listItem);

  // если есть объект "evt", то закрываем popup через функцию
  if (evt) {
    closePopup(evt);
  }
}

// поставить/убрать "like"
function like(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('button_active');
}

// удалить карточку "места"
function removePlaceCard(evt) {
  const removedPlaceCard = evt.target.closest('li');
  removedPlaceCard.remove();
}

// вешаем события для кнопок: "редактировать", "добавить", "закрыть"
profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click', openPopup);
popupCloseButton.forEach((item) => {
  item.addEventListener('click', closePopup);
});

// вешаем события для форм: "сохранить изменения", "добавить новое место"
editPopupForm.addEventListener('submit', saveProfileChanges);
addPopupForm.addEventListener('submit', addNewPlaceCard);
