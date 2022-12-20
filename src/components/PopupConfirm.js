import Popup from './Popup';

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.button_type_submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      console.log('Yes');
      // запустить колбэк, который отправит запрос на сервер для удаления карточки
    });
  }
}
