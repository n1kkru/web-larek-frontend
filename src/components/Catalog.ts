import { IItem } from '../types';

// интерфейс списка товаров
export interface ICatalog {
  _items: IItem[];                    // список товаров
  add(item: IItem): void;             // метод добавления товара
  addList(itemList: IItem[]): void;   // метод добавления товаров
  getItem(id: string): IItem;         // получить товар по id
  getItem(id: string): IItem;         // получить все товары
}

export class Catalog implements ICatalog {
  _items: IItem[];

  constructor(list: IItem[]) {
    this._items = list
  }

  add(item: IItem) {
    this._items.push(item);
  }

  addList(itemList: IItem[]) {
    this._items = itemList;
  }

  getItem(id: string): IItem {
    return this._items.find( item => item.id === id )
  }

  getItems() : IItem[] {
    return this._items;
  }
}