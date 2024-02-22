import {IItem, IOrderSuccess } from '../types';
import {IOrder} from './Order';
import { Api } from './base/api';
 
export interface IWebAPI {
  getProductList() : Promise<IItem[]>;
  getItem(id: string) : Promise<IItem>;
  postOrder(order: IOrder) : Promise<IOrderSuccess>;
}

export class WebAPI extends Api implements IWebAPI {

  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }

  getProductList() : Promise<IItem[]> {
    return this.get(this.baseUrl + '/product')
        .then( (data: IItem[]) => data);
  }

  getItem(id: string): Promise<IItem> {
    return this.get(this.baseUrl + '/product/' + id)
        .then( (item: IItem) => item);
  }

  postOrder(order: IOrder): Promise<IOrderSuccess> {
    return this.post(this.baseUrl+ '/order', order)
        .then( (data: IOrderSuccess) => data)
  }
}
