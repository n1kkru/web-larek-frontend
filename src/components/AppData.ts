import {IItem, IAppState, IOrderSuccess} from '../types';
import {IBasketModel} from './Basket';
import {ICatalog} from './Catalog';
import {IOrder, IOrderEmail, IOrderAddress} from './Order';
import {Model} from "./base/Model";
/*
export class AppState extends Model<IAppState> {
    basket: IBasketModel;
    catalog: IItem[];
    order: IOrder = {
        payment: 'online',
        address: '',
        email: '',
        phone:  '',
        items: [],
        total: 1
    };

    clearBasket() {
        this.basket.clear();
    }

    getTotal() {
        return this.order.items.reduce(
            (a, c) => a + this.catalog.find(
                it => it.id === c).price, 0)
    }

    setCatalog(items: IItem[]) {
        console.log('this.catalog', this.catalog);
        console.log(items);
        this.catalog = items;
        // this.catalog.addList(items);
 
        this.emitChanges('catalog:loading', { catalog: this.catalog });
    }

    // getItem(id: string): IItem {
    //     return this.catalog.getItem(id);
    // }

    setOrderEmail(field: keyof IOrderEmail, value: string) {

        // доработать
        this.order[field] = value;
        this.events.emit('order:ready', this.order);
    }

}*/

export type CatalogChangeEvent = {
    catalog: IItem[]
};

export class Item extends Model<IItem> {
    id: string;         // идентификатор товара
    title: string;      // имя товара
    category: string;   // категория
    description: string;// описание
    image: string;      // изображение
    price: number;      // цена

}

export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IItem[];
    order: IOrder = {
        payment: 'online',
        address: '',
        email: '',
        phone:  '',
        items: [],
        total: 1
    };
    preview: string | null;

    clearBasket() {
        this.basket = [];
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: IItem[]) {
        console.log('setCatalog');
        console.log('items',typeof items );
        items = Array.from(items);
        this.catalog = items.map(item => new Item(item, this.events));
        this.emitChanges('catalog:loading', { catalog: this.catalog });
    }

    setPreview(item: Item) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    setOrderField(field: keyof IOrderEmail, value: string) {
        this.order[field] = value;
    }
}