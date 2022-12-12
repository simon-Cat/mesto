export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.button_type_close');
    this._keyCodeESC = 27;
    // привязка метода к контексту
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // показать popup
  open() {
    this._popup.classList.add('popup_opened');
    this._setKeyboardEvent();
  }

  // скрыть popup
  close() {
    this._popup.classList.remove('popup_opened');
    this._removeKeyboardEvent();
  }

  // скрыть popup при нажатии esc
  _handleEscClose(evt) {
    if (evt.keyCode === this._keyCodeESC) {
      this.close();
    }
  }

  // слушатель на нажатие клавиши esc
  _setKeyboardEvent() {
    // document.addEventListener('keydown', this._handleEscClose.bind(this));

    document.addEventListener('keydown', this._handleEscClose);
  }

  // удаление слушателя клавиши esc
  _removeKeyboardEvent() {
    // document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // закрыть popup через overlay
  _closeWithOverlay(evt) {
    if (evt.target.classList.contains('popup__container')) {
      this.close();
    }

    return;
  }

  // вешаем слушатели событий
  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close.bind(this));
    document.addEventListener('mousedown', this._closeWithOverlay.bind(this));
  }
}
