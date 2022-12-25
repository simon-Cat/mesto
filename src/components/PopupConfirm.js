import Popup from './Popup';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, deleteFromDBHandler) {
    super(popupSelector);
    this._buttonSubmit = this._popup.querySelector('.button_type_submit');
    this._deleteFromDB = deleteFromDBHandler;
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
      this._deleteFromDB(this._cardID)
        .then(() => {
          this._removeFromPage();
        })
        .catch((err) => console.log(err));
      super.close();
    });
  }
}
