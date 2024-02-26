import { IItem } from '../types';

// интерфейс списка товаров
export interface ICatalog {
  items: IItem[];             // список товаров
  add(item: IItem): void;  // метод добавления товарова
  addList(itemList: IItem[]): void;  // метод добавления товаров
  getItem(id: string): IItem; // получить товар по id
}

export class Catalog implements ICatalog {
  items: IItem[];

  constructor(list: IItem[]) {
    this.items = list
    
  }
  // items: IItem[] = [];

  add(item: IItem) {
    this.items.push(item);
  }

  addList(itemList: IItem[]) {
    this.items = itemList;
  }

  getItem(id: string): IItem {
    return this.items.find( item => item.id === id )
  }
}