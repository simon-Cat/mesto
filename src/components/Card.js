export default class Card {
  constructor(data, templateSelector, handler) {
    this._imageLink = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
    // обработчик для показа увеличенного изображения карточки места
    this._externalHandler = handler;
  }

  // Получение шаблона карточки места
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);

    const card = cardTemplate.querySelector('li');

    return card;
  }

  // Установка слушателей событий для кнопок "like", "remove"
  // и открытия изображения в полном масштабе
  _setEventListeners() {
    // кнопка "like" и обработчик события к ней
    this._buttonLike.addEventListener('click', this._like.bind(this));

    // кнопка "remove" и обработчик события к ней
    this._buttonRemove.addEventListener('click', this._remove.bind(this));

    // открытие изображения в полном масштабе
    // при нажатии на изображение карточки
    this._imageCard.addEventListener('click', () => {
      // открыть изображение в полном масштабе
      this._externalHandler(this._imageLink, this._title);
    });
  }

  // Обработчик при клике на кнопку "like"
  _like() {
    this._buttonLike.classList.toggle('button_active');
  }

  // Обработчик при клике на кнопку "remove"
  _remove() {
    this._element.remove();
    this._element = null;
  }

  // Получение полностью готовой карточки места
  generateCard() {
    // элемент карточки
    this._element = this._getTemplate();

    // элемент изображения карточки
    this._imageCard = this._element.querySelector('.place__image');

    // атрибуты src и alt для изображения карточки
    this._imageCard.setAttribute('src', this._imageLink);
    this._imageCard.setAttribute('alt', this._title);

    // текст для элемента place__title
    this._titleCard = this._element.querySelector('.place__title');
    this._titleCard.textContent = this._title;

    // элемент кнопки "like"
    this._buttonLike = this._element.querySelector('.button_type_like');

    // элемент кнопки удаления карточки
    this._buttonRemove = this._element.querySelector('.button_type_remove');

    // вешаем обработчики
    this._setEventListeners();

    return this._element;
  }
}
