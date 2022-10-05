let profile = document.querySelector('.profile'),
  profile_title = profile.querySelector('.profile__title'),
  profile_description = profile.querySelector('.profile__description'),
  profile_edit_button = profile.querySelector('.button_type_edit'),
  popup = document.querySelector('.popup'),
  popup_save_button = popup.querySelector('.button_type_submit'),
  popup_close_button = popup.querySelector('.button_type_close');

profile_edit_button.addEventListener('click', showHidenPopup);
popup_close_button.addEventListener('click', showHidenPopup);
popup_save_button.addEventListener('click', saveProfileChanges);

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
}
