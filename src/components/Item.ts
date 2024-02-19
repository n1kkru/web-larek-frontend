// интерфейс товара
export interface IItem {
    id: string;         // идентификатор товара
    title: string;      // имя товара
    category: string;   // категория
    description: string;// описание
    image: string;      // изображение
    price: number;      // цена
  }