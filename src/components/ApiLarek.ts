import {IItem, IOrderSuccess } from '../types';
import {IOrder} from './Order';
import { Api } from './base/api';
 
type dataObject = {
  total: number,
  items: IItem[];
}

export interface IWebAPI {
  getProductList() : Promise<IItem[]>;
  getItem(id: string) : Promise<IItem>;
  postOrder(order: IOrder) : Promise<IOrderSuccess>;
}

export class WebAPI extends Api implements IWebAPI {

  constructor(protected cdn : string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
  }

  getProductList() : Promise<IItem[]> {
    return this.get('/product')
        .then( (data: dataObject) => {
          return data.items.map( (item : IItem) => ({
            ...item,
            image: this.cdn + item.image,
          }))
        });
  }

  getItem(id: string): Promise<IItem> {
    return this.get('/product/' + id)
        .then( (item: IItem) => ({
          ...item,
          image: this.cdn + item.image,
      }));
  }

  postOrder(order: IOrder): Promise<IOrderSuccess> {
    return this.post('/order', order)
        .then( (data: IOrderSuccess) => data)
  }
}
