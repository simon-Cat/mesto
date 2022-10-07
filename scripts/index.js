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
  input_name = popup.querySelector('.form__input_type_name'),
  // input с должностью
  input_post = popup.querySelector('.form__input_type_post');

// открыть popup
function openPopup() {
  input_name.value = profileTitle.textContent;
  input_post.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// закрыть popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// сохранить изменения профиля
function saveProfileChanges(evt) {
  evt.preventDefault();

  profileTitle.textContent = input_name.value;
  profileDescription.textContent = input_post.value;

  closePopup();
}

// вешаем события для кнопок: "редактировать" ,"закрыть", "сохранить"
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfileChanges);
