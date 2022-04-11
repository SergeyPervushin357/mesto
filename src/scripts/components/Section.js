export class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(cardList) {
    cardList.forEach(data => {
      this._renderer(data);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}