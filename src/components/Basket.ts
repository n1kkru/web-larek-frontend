import {ICatalog} from './Catalog';

interface IBasketModel {
  // items: Map<string, number>; // товар в виде название: цена
  items: ICatalog;            // список товаров в корзине (?)
  totalPrice: number;         // итоговая цена
  add(id: string): void;      // добавить товар в корзину
  remove(id: string) : void;  // удалить из корзины
}

interface IBasketView {
  items: HTMLElement[]; // список товаров
  onClick: (event: MouseEvent) => void;
}