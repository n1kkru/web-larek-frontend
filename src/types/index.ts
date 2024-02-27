import { IBasketView } from "../components/Basket";
import { ICatalog } from "../components/Catalog";
import { IOrder } from "../components/Order";

export type PaymentType = 'card' | 'cash'; // способ оплаты

export interface IItem {
  id: string;         // идентификатор товара
  title: string;      // имя товара
  category: string;   // категория
  description: string;// описание
  image: string;      // изображение
  price: number;      // цена
}

// интерфейс ответа подтверждения заказа
export interface IOrderSuccess {
  total: number
}

export interface IAppState {
  catalog: IItem[];
  basket: string[];
  order: IOrder | null;
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

