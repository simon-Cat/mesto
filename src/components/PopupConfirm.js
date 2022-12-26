import Popup from './Popup';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, deleteCardFromDBHandler) {
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.button_type_submit');
    this._deleteCardFromDB = deleteCardFromDBHandler;
  }

  // получить ID карточки
  // открыть popup
  getCardID(id) {
    this._cardID = id;
    super.open();
  }

  // получить функцию удаления
  // карточки со страницы
  getRemoveFn(removeFn) {
    this._removeFromPage = removeFn;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      // удалить карточку из БД
      // удалить карточку со страницы
      // закрыть попап
      this._deleteCardFromDB(this._cardID, this._removeFromPage);
    });
  }
}
