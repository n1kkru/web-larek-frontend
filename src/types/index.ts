export type PaymentType = 'card' | 'cash'; // способ оплаты

export interface IItem {
  id: string;         // идентификатор товара
  title: string;      // имя товара
  category: string;   // категория
  description: string;// описание
  image: string;      // изображение
  price: number;      // цена
}

// для формы 1
export interface IOrderAddress {
  payment: PaymentType | null;
  address: string;
}

// для формы 2
export interface IOrderContacs {
  email: string;
  phone: string;
}

// для отправки
export interface IOrder extends IOrderAddress, IOrderContacs {
  items: string[];
  total: number;
}

// интерфейс ответа подтверждения заказа
export interface IOrderSuccess {
  total: number
}

export interface IActions {
  onClick: (event: MouseEvent) => void;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

