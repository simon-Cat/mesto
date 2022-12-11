export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.__initArray = items;
    this.__renderer = renderer;
    this.__container = document.querySelector(containerSelector);
  }

  // отрисовать элементы
  renderElements() {
    this.__initArray.forEach((item) => {
      this.__renderer(item);
    });
  }

  // добавить элемент на страницу
  addItem(element) {
    this.__container.prepend(element);
  }
}
