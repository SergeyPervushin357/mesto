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

  addItem(element, createdSubmit) {
    createdSubmit
      ? this._container.prepend(element)
      : this._container.append(element)
  };
}