import {ICatalog} from './Catalog';

export interface IBasketModel {
  // items: Map<string, number>; // товар в виде название: цена
  items: ICatalog;            // список товаров в корзине (?)
  add(id: string): void;      // добавить товар в корзину
  remove(id: string) : void;  // удалить из корзины
  clear(): void;              // отчистить корзину
}

export interface IBasketView {
  items: HTMLElement[]; // список товаров
  total: number;        // сумма покупок
}