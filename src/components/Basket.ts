import {IItem} from '../types';
import {createElement, ensureElement} from '../utils/utils'
import {Component} from "./base/Component";
import {IEvents} from "./base/events";


export interface IBasketModel {
  _items: IItem[];            // список товаров в корзине (?)
  add(id: string): void;      // добавить товар в корзину
  remove(id: string) : void;  // удалить из корзины
  clear(): void;              // отчистить корзину
  getItems(): IItem[];        // получить корзину
}

export class BasketModel implements IBasketModel {
  _items : IItem[] = [];

  add(id: string): void {
    this._items.push(this._items.find(item => item.id === id));
  }

  remove(id: string) : void {
    this._items = this._items.filter(item => item.id !== id);
  }

  clear(): void {
    this._items = [];
  }

  getItems(): IItem[] {
    return this._items;
  }

}

export interface IBasketView {
  items: HTMLElement[]; // список товаров
  total: number;        // сумма покупок
}

export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    // Инициировать событие оформление заказа
    if (this._button) {
        this._button.addEventListener('click', () => {
            events.emit('order:start');
        });
    }

    this.items = [];
  }

  // Заполнить разметку корзины
  set items(items: HTMLElement[]) {
    if(items.length) {
      this._list.replaceChildren(...items);
    } 
    else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста'
      }));
    }
  }

  // Заполнить сумму
  set total(total: number) {
    this.setText(this._total, Number(total));
  }

}