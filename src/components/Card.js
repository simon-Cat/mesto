export default class Card {
  constructor(
    { link, name, likes, owner, _id },
    templateSelector,
    handlerFullImage,
    // handlerDeleteFromDB,
    popup,
    byeElem
  ) {
    this._imageLink = link;
    this._title = name;
    // кол-во лайков
    this._likeCount = likes.length;
    // ID собственника карточки
    this._ownerID = owner._id;
    // ID карточки
    this._cardID = _id;
    this._templateSelector = templateSelector;
    // обработчик для показа увеличенного изображения карточки места
    this._handlerFullImage = handlerFullImage;
    // удаление карточки из БД
    // this._deleteFromDB = handlerDeleteFromDB;

    this.test = popup;
    this.byeEl = byeElem;
  }

  // Получение шаблона карточки места
  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const card = cardTemplate.querySelector('li').cloneNode(true);
    return card;
  }

  // Установка слушателей событий для кнопок "like", "remove"
  // и открытия изображения в полном масштабе
  _setEventListeners() {
    // кнопка "like" и обработчик события к ней
    this._buttonLike.addEventListener('click', this._like.bind(this));

    // кнопка "remove" и обработчик события к ней
    // this._buttonRemove.addEventListener('click', this._remove.bind(this));
    this._buttonRemove.addEventListener('click', () => {
      this.test(this._cardID);
      this.byeEl(this._remove.bind(this));
    });

    // открытие изображения в полном масштабе
    // при нажатии на изображение карточки
    this._imageCard.addEventListener('click', () => {
      // открыть изображение в полном масштабе
      this._handlerFullImage(this._imageLink, this._title);
    });
  }

  // Обработчик при клике на кнопку "like"
  _like() {
    this._buttonLike.classList.toggle('button_active');
  }

  // Обработчик при клике на кнопку "remove"
  _remove() {
    console.log('remove');
    // this._deleteFromDB(this._cardID);
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

    // количество лайков
    this._likeCountCard = this._element.querySelector('.place__like-count');
    this._likeCountCard.textContent = this._likeCount;

    // элемент кнопки "like"
    this._buttonLike = this._element.querySelector('.button_type_like');

    // элемент кнопки удаления карточки
    this._buttonRemove = this._element.querySelector('.button_type_remove');

    // если карточка создана не мной
    // то скрыть кнопку удаления
    if (this._ownerID !== '84a670d06bc1d0a20c48f9bd') {
      this._buttonRemove.remove();
    }

    // вешаем обработчики
    this._setEventListeners();

    return this._element;
  }
}
