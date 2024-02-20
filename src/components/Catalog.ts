import {IOrder} from './Order';

// интерфейс списка товаров
export interface ICatalog {
  items: IOrder[];             // список товаров
  add(items: IOrder[]): void;  // метод добавления товаров
  getItem(id: string): IOrder; // получить товар по id
}