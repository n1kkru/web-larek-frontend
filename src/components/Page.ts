import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export interface IPage {
    catalog: HTMLElement;   // каталог товаров
    basket: HTMLElement;    // корзина
    counter: HTMLElement;   //счетчикк товаров в корзине
}

export class Page extends Component<IPage> {
    protected _catalog: HTMLElement;
    protected _basket: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _counter: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._basket = ensureElement<HTMLElement>('header__basket');
        this._catalog = ensureElement<HTMLElement>('gallery');
        this._wrapper = ensureElement<HTMLElement>('header__logo-image');
        this._counter = ensureElement<HTMLElement>('header__basket-counter');

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set counter(value: number) {
        this.setText(this._counter, String(value));
    }
}