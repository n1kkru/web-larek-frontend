import {IItem, IOrderSuccess } from '../types';
import {IOrder} from './Order';
 
export interface IWebAPI {
  getProductList: () => Promise<IItem[]>;
  getItem: (id: string) => Promise<IItem>;
  postOrder: (order: IOrder) => Promise<IOrderSuccess>;
}