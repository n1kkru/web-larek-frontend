import {IForm} from './Form';

interface IModal {
  content: HTMLElement;
}

// для модалки карточки
interface IModalCard extends IModal, ICard {
  // title: HTMLElement;
  // image: HTMLImageElement;
  // category: HTMLElement;
  // price: HTMLElement;
  onClickBuy: (event: MouseEvent) => void;
  onClickClose: (event: MouseEvent) => void;
}

// для модалки с почтой и телефоном
interface IModalOrder extends IModal {
  form: IForm;
}

// для модалки с адресом
interface IModalAddress extends IModalOrder {
  payment: HTMLButtonElement;
}