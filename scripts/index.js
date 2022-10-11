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

function addInitialPlaceCard() {
  initialCards.forEach((item) => {
    // template блока place
    const placeTemplate = document
      .querySelector('#place')
      .content.cloneNode(true);

    const placeCard = placeTemplate.querySelector('.place');

    // элемент title блока place
    const placeImage = placeCard.querySelector('.place__image');

    // элемент img блока place
    const placeTitle = placeCard.querySelector('.place__title');
    // атрибуты src и alt для элемента place__image
    placeImage.setAttribute('alt', item.name);
    placeImage.setAttribute('src', item.link);

    // текст для элемента place__title
    placeTitle.textContent = item.name;

    // элемент списка li
    const listItem = document.createElement('li');

    // Добавление блока place в элемент списка li
    listItem.append(placeCard);

    // Добавление элемента списка li с блоком place в блок places__list
    placesList.append(listItem);
  });
}

addInitialPlaceCard();

// блок profile
let profile = document.querySelector('.profile'),
  // элемент "title" в блоке profile
  profileTitle = profile.querySelector('.profile__title'),
  // элемент "description" в блоке profile
  profileDescription = profile.querySelector('.profile__description'),
  // элемент кнопки "редактировать" в блоке profile
  profileEditButton = profile.querySelector('.button_type_edit'),
  // блок popup
  popup = document.querySelector('.popup'),
  // форма блока popup
  popupForm = popup.querySelector('.popup__form'),
  // элемент кнопки "закрыть" в блоке popup
  popupCloseButton = popup.querySelector('.button_type_close'),
  // input с именем
  inputName = popup.querySelector('.form__input_type_name'),
  // input с должностью
  inputPost = popup.querySelector('.form__input_type_post');

// открыть popup
function openPopup() {
  inputName.value = profileTitle.textContent;
  inputPost.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// закрыть popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// сохранить изменения профиля
function saveProfileChanges(evt) {
  evt.preventDefault();

  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputPost.value;

  closePopup();
}

// вешаем события для кнопок: "редактировать" ,"закрыть", "сохранить"
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfileChanges);
