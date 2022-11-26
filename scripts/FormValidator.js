class FormValidator {
  constructor(dataConfig, formSelector) {
    this._config = dataConfig;
    this._formSelector = formSelector;
  }

  // проверяем есть ли невалидные поля input
  _hasInvalidInput(inputElements) {
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // состояние кнопки отправки
  _toggleButtonState(inputElements, buttonElement) {
    if (this._hasInvalidInput(inputElements)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  // отобразить/скрыть ошибки у поля input, если оно невалидное
  _checkInputValidity(inputElement) {
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
    // Подучаем все input формы
    const formInputElements = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    // Получаем кнопку формы
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this._toggleButtonState(formInputElements, buttonElement);

    // Проверяем на валидность все input формы
    formInputElements.forEach((inputElement) => {
      // Проверка input при включении валидации
      this._checkInputValidity(inputElement);
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(formInputElements, buttonElement);
      });
    });
  }

  // вешаем обработчики на все формы
  enableValidation() {
    // Получаем элемент формы
    this._formElement = document.querySelector(this._formSelector);

    this._setEventListeners();
  }
}

export { FormValidator };
