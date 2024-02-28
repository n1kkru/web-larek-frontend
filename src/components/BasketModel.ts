import { IBasketItem } from "../types";

export interface IBasketModel {
  _items: IBasketItem[];              // список товаров в корзине
  add(newItem: IBasketItem): void;    // добавить товар в корзину
  remove(id: string) : void;          // удалить из корзины
  clear(): void;                      // отчистить корзину
  getItems(): IBasketItem[];          // получить корзину
  getCount() : number;                // получить количество товаров в корзине
}

export class BasketModel implements IBasketModel {
  _items : IBasketItem[] = [];

  add(newItem: IBasketItem): void {
    this._items.push(newItem);
  }

  remove(id: string) : void {
    this._items = this._items.filter(item => item.id !== id);
  }

  clear(): void {
    this._items = [];
  }

  getItems(): IBasketItem[] {
    return this._items;
  }

  getCount() : number {
    return this._items.length;
  }

  getTotal() : number {
    return this._items.reduce( (sum, item) => sum + item.price, 0)
  }
}