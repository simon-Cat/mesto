export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовать элементы
  renderElements() {
    this._initArray.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавить элемент на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}
