export default class FormValidator {
  constructor(dataConfig, formSelector) {
    this._config = dataConfig;
    this._formSelector = formSelector;
  }

  // проверяем есть ли невалидные поля input
  _hasInvalidInput() {
    return this._formInputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // состояние кнопки отправки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._formButton.classList.add(this._config.inactiveButtonClass);
      this._formButton.setAttribute('disabled', 'disabled');
    } else {
      this._formButton.classList.remove(this._config.inactiveButtonClass);
      this._formButton.removeAttribute('disabled', 'disabled');
    }
  }

  // отобразить/скрыть ошибки у поля input, если оно невалидное
  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // показываем ошибки
  _showInputError(inputElement) {
    // поиск элемента span с текстом ошибки
    const inputErrorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    // Добавление класса ошибки для input
    inputElement.classList.add(this._config.inputErrorClass);

    // Добавление текста ошибки и класса ошибки для span
    inputErrorElement.textContent = inputElement.validationMessage;
    inputErrorElement.classList.add(this._config.inputErrorElementClass);
  }

  // скрываем ошибки
  _hideInputError(inputElement) {
    // поиск элемента span с текстом ошибки
    const inputErrorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    // Удаление класса ошибки для input
    inputElement.classList.remove(this._config.inputErrorClass);

    // Удаление текста ошибки и класса ошибки для span
    inputErrorElement.textContent = '';
    inputErrorElement.classList.remove(this._config.inputErrorElementClass);
  }

  _setEventListeners() {
    this.toggleButtonState();

    // Проверяем на валидность все input формы
    this._formInputElements.forEach((inputElement) => {
      // Проверка input при включении валидации
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

    // слушатель события при очитске формы
    this._formElement.addEventListener('reset', this._resetForm.bind(this));
  }

  // очистка формы
  _resetForm() {
    this._formInputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    // Получаем элемент формы
    this._formElement = document.querySelector(this._formSelector);

    // получаем поля input формы
    this._formInputElements = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    // Получаем элемент кнопки
    this._formButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    // вешаем обработчики
    this._setEventListeners();
  }
}
