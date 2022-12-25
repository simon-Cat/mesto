import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    this._formInputList = Array.from(
      this._form.querySelectorAll('.form__input')
    );
    this._buttonSubmit = this._form.querySelector('.button_type_submit');
    this._textButtonSubmit = this._buttonSubmit.querySelector('.button__text');
  }

  // получить данные всех инпутов
  // поместить их в объект
  _getInputValues() {
    this._inputValues = {};
    this._formInputList.forEach((element) => {
      this._inputValues[element.name] = element.value;
    });
  }

  // вешаем обработчики событий
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.toggleLoader(true);
      this._getInputValues();
      this._handlerSubmit(this._inputValues);
    });
  }

  // переключатель загрузчика
  toggleLoader(boolean) {
    if (boolean) {
      this._buttonSubmit.classList.add('button_disabled');
      this._textButtonSubmit.textContent = 'Сохранение...';
    } else {
      this._textButtonSubmit.textContent = 'Сохранить';
      this._buttonSubmit.classList.remove('button_disabled');
    }
  }

  // закрыть попап
  close() {
    super.close();
    this._form.reset();
  }
}
