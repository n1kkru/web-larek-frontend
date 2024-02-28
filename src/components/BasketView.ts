import {createElement, ensureElement} from '../utils/utils'
import {Component} from "./base/Component";
import {IEvents} from "./base/events";

export interface IBasketView {
  items: HTMLElement[]; // список товаров
  total: number;        // сумма покупок
}

export class BasketView extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    // Инициировать событие оформление заказа
    if (this._button ) {
        this._button.addEventListener('click', () => {
            events.emit('order:start',  {valid: false});
        });
    }
    this.items = [];
  }

  // Заполнить разметку корзины
  set items(items: HTMLElement[]) {
    if(items.length) {
      this._list.replaceChildren(...items);
      this._button.disabled = false;
    } 
    else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста'
      }));
      this._button.disabled = true;
    }
  }

  // Заполнить сумму
  set total(total: number) {
    this.setText(this._total, String(total) + ' синапсов');
  }
}