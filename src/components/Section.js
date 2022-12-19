export default class Section {
  // constructor({ items, renderer }, containerSelector) {
  //   console.log(items);
  //   this._initArray = items;
  //   this._renderer = renderer;
  //   this._container = document.querySelector(containerSelector);
  // }

  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отрисовать элементы
  // renderElements() {
  //   this._initArray.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

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
