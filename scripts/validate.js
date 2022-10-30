// объект с наименованиями свойств
const config = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorElementSelector: '.form__input-error',
  inputErrorElementClass: 'form__input-error_type_visible',
  submitButtonSelector: '.button_type_submit',
  inactiveButtonClass: 'button_disabled',
};

// показываем ошибки
const showInputError = (
  formElement,
  inputElement,
  errorInputClass,
  inputErrorElementClass
) => {
  // поиск элемента span с текстом ошибки
  const inputErrorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.add(errorInputClass);

  inputErrorElement.textContent = inputElement.validationMessage;
  inputErrorElement.classList.add(inputErrorElementClass);
};

// скрываем ошибки
const hideInputError = (formElement, inputElement, errorInputClass) => {
  // поиск элемента span с текстом ошибки
  const inputErrorElement = formElement.querySelector(
    `.${inputElement.id}-error`
  );

  inputElement.classList.remove(errorInputClass);

  inputErrorElement.textContent = '';
  inputErrorElement.classList.remove('form__input-error_type_visible');
};

// проверяем есть ли невалидные поля input
const hasInvalidInput = (inputElements) => {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// состояние кнопки отправки
const toggleButtonState = (inputElements, buttonElement, objectProperties) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(objectProperties.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(objectProperties.inactiveButtonClass);
  }
};

// отобразить/скрыть ошибки у поля input, если оно невалидное
const checkInputValidity = (formElement, inputElement, objectProperties) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      objectProperties.inputErrorClass,
      objectProperties.inputErrorElementClass
    );
  } else {
    hideInputError(formElement, inputElement, objectProperties.inputErrorClass);
  }
};

// вешаем обработчики на все элементы input форм
const setEventListener = (formElement, objectProperties) => {
  const formInputElements = Array.from(
    formElement.querySelectorAll(objectProperties.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    objectProperties.submitButtonSelector
  );

  toggleButtonState(formInputElements, buttonElement, objectProperties);

  formInputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, objectProperties);
      toggleButtonState(formInputElements, buttonElement, objectProperties);
    });

    // checkInputValidity(formElement, inputElement, objectProperties);
  });
};

// вешаем обработчики на все формы
const enableValidation = (objectProperties) => {
  const forms = Array.from(document.querySelectorAll('.form'));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListener(form, objectProperties);
  });
};
