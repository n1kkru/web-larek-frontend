export type PaymentType = 'online' | 'upon receipt'; // способ оплаты

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
  id: string;
  total: number
}