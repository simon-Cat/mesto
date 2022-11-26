class Card {
  constructor(data, templateSelector) {
    this._imageLink = data.link;
    this._title = data.name;
    this._templateSelector = templateSelector;
  }

  // Получение шаблона карточки места
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);

    const card = cardTemplate.querySelector('li');

    return card;
  }

  // Установка слушателей событий для кнопок "like" и "remove"
  _setEventListeners() {
    // кнопка "like" и обработчик события к ней
    const buttonLike = this._element.querySelector('.button_type_like');
    buttonLike.addEventListener('click', this._like);

    // кнопка "remove" и обработчик события к ней
    const buttonRemove = this._element.querySelector('.button_type_remove');
    buttonRemove.addEventListener('click', this._remove);
  }

  // Обработчик при клике на кнопку "like"
  _like(evt) {
    const buttonLike = evt.target;
    buttonLike.classList.toggle('button_active');
  }

  // Обработчик при клике на кнопку "remove"
  _remove(evt) {
    const placeRemovedCard = evt.target.closest('li');
    placeRemovedCard.remove();
  }

  // Получение полностью готовой карточки места
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeImage = this._element.querySelector('.place__image');
    // атрибуты src и alt для элемента place__image
    placeImage.setAttribute('src', this._imageLink);
    placeImage.setAttribute('alt', this._title);

    const placeTitle = this._element.querySelector('.place__title');
    // текст для элемента place__title
    placeTitle.textContent = this._title;

    return this._element;
  }
}

export { Card };
