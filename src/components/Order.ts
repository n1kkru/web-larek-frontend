import { PaymentType } from "../types";

// для формы 1
export interface IOrderAddress {
  payment: PaymentType;
  address: string;
}

// для формы 2
export interface IOrderEmail {
  email: string;
  phone: string;
}

// для отправки
export interface IOrder extends IOrderAddress, IOrderEmail {
  items: string[];
  total: number;
}
