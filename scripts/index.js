let profile = document.querySelector('.profile'),
  profile_title = profile.querySelector('.profile__title'),
  profile_description = profile.querySelector('.profile__description'),
  profile_edit_button = profile.querySelector('.button_type_edit'),
  popup = document.querySelector('.popup'),
  popup_save_button = popup.querySelector('.button_type_submit'),
  popup_close_button = popup.querySelector('.button_type_close'),
  place_like_buttons = document.querySelectorAll('.button_type_like');

profile_edit_button.addEventListener('click', showHidenPopup);
popup_close_button.addEventListener('click', showHidenPopup);
popup_save_button.addEventListener('click', saveProfileChanges);

for (let i = 0; i < place_like_buttons.length; i++) {
  place_like_buttons[i].addEventListener('click', function () {
    place_like_buttons[i].classList.toggle('button_active');
  });
}

function showHidenPopup(evt) {
  evt.preventDefault();

  if (!popup.classList.contains('popup_opened')) {
    popup.classList.add('popup_opened');
  } else {
    popup.classList.remove('popup_opened');
  }
}

function saveProfileChanges(evt) {
  evt.preventDefault();

  let input_name = popup.querySelector('.input_type_name').value,
    input_post = popup.querySelector('.input_type_post').value;

  profile_title.textContent = input_name;
  profile_description.textContent = input_post;

  popup.classList.remove('popup_opened');
}
