import { IItem } from "../types";

export interface IBasketModel {
  _items: IItem[];              // список товаров в корзине
  add(newItem: IItem): void;    // добавить товар в корзину
  remove(id: string) : void;          // удалить из корзины
  clear(): void;                      // отчистить корзину
  hasItem(id: string): boolean        // проверяет есть ли товар в корзине
  getItems(): IItem[];          // получить корзину
  getCount() : number;                // получить количество товаров в корзине
}

export class BasketModel implements IBasketModel {
  _items : IItem[] = [];

  add(newItem: IItem): void {
    this._items.push(newItem);
  }

  remove(id: string) : void {
    this._items = this._items.filter(item => item.id !== id);
  }

  clear(): void {
    this._items = [];
  }

  hasItem(id: string) {
    return this._items.find(item => item.id === id)? true : false;
  }

  getItems(): IItem[] {
    return this._items;
  }

  getCount() : number {
    return this._items.length;
  }

  getTotal() : number {
    return this._items.reduce( (sum, item) => sum + item.price, 0)
  }
}