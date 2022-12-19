export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовать элементы
  renderElements(initArray) {
    initArray.forEach((item) => {
      this._renderer(item);
    });
  }

  // добавить элемент на страницу
  addItem(element) {
    this._container.prepend(element);
  }
}
