import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._blockFullImage = this._popup.querySelector('.popup__full-image');
    this._caption = this._popup.querySelector('.popup__text');
  }
  // открыть попап с полномасштабным изображением
  open(imageLink, imageTitle) {
    this._blockFullImage.src = imageLink;
    this._blockFullImage.alt = imageTitle;
    this._caption.textContent = imageTitle;
    super.open();
  }
}
