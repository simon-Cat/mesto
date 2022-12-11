import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerSubmit = handlerSubmit;
    this._form = this._popup.querySelector('.form');
    this._formInputList = Array.from(
      this._form.querySelectorAll('.form__input')
    );
    console.log(this._handlerSubmit);
  }
  _getInputValues() {
    this._inputValues = {};
    this._formInputList.forEach((element, index) => {
      this._inputValues[`input_${index}`] = element.value;
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._handlerSubmit(this._inputValues);
    });
  }
}
