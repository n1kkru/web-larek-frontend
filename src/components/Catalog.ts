import {IItem} from './Item';

// интерфейс списка товаров
export interface ICatalog {
  items: IItem[];             // список товаров
  add(item: IItem): void;     // метод добавления товара
  getItem(id: string): IItem; // получить товар по id
}