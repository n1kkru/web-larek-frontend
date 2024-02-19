import { IOrder, IOrderSuccess } from '../types';
import {IItem} from './Item';
 
export interface IAuctionAPI {
  getProductList: () => Promise<IItem[]>;
  getItem: (id: string) => Promise<IItem>;
  postOrder: (order: IOrder) => Promise<IOrderSuccess>;
}