export type PaymentType = 'online' | 'upon receipt'; // способ оплаты

// интерфейс данных покупателя
export interface IClient {
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
}

// интерфейс заказа
export interface IOrder extends IClient {
  items: string[]
  total: number;
}

// интерфейс ответа подтверждения заказа
export interface IOrderSuccess {
  id: string;
  total: number
}