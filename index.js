let profile = document.querySelector(".profile"),
  edit_button = profile.querySelector(".button_type_edit"),
  popup = document.querySelector(".popup"),
  close_button = popup.querySelector(".button_type_close");

edit_button.addEventListener("click", showHidenPopup);
close_button.addEventListener("click", showHidenPopup);

function showHidenPopup() {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
  } else {
    popup.classList.remove("popup_opened");
  }
}
