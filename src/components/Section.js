class Section {
  constructor({ items, renderer }, containerSelector) {
    this.__initArray = items;
    this.__renderer = renderer;
    this.__container = document.querySelector(containerSelector);
  }

  renderElements() {
    this.__initArray.forEach((item) => {
      this.__renderer(item);
    });
  }

  addItem(element) {
    this.__container.prepend(element);
  }
}

export { Section };
