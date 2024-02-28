import { IActions } from '../types';
import {ensureElement} from '../utils/utils'
import {Component} from "./base/Component";

/* что то сделать с карточками */


interface ICard {
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
}

export class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;
  protected _description?: HTMLElement;
  protected _buttonBuy?: HTMLButtonElement;

  constructor(protected blockName: string, container: HTMLElement, actions?: IActions) {
    super(container);
        
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._category = container.querySelector(`.${blockName}__category`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._description = container.querySelector(`.${blockName}__text`);
    this._buttonBuy = container.querySelector(`.${blockName}__button`);
    
    if (actions?.onClick) {
      this._buttonBuy.addEventListener('click', actions.onClick);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
      return this._title.textContent || '';
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title)
  }

  set category(value: string) {
    this.setText(this._category, value);
    this.setColor(value);
  }

  set price(value: number) {
    if (value === null) {
      this.setText(this._price, 'Бесценно');
      this.setDisabled(this._buttonBuy, true);
    }
    else {
      this.setText(this._price, value + ' синапсов');
    }
  }

  get price() : number {
    return Number(this._price.textContent);
  }

  private setColor(category: string) {
    switch (category) {
      case 'другое':
        this._category.classList.add('card__category_other');
        break;
    
      case 'софт-скил':
        this._category.classList.add('card__category_soft');
        break;
        
      case 'дополнительное':
        this._category.classList.add('card__category_additional');
        break;

      case 'кнопка':
        this._category.classList.add('card__category_button');
        break;

      case 'хард-скил':
        this._category.classList.add('card__category_hard');
        break;

      default:
        this._category.classList.add('card__category_other');
        break;
    }
  }

}

export class GalleryItem extends Card {
  constructor(protected blockName: string, container: HTMLElement, actions?: IActions) {
    super(blockName, container);

    if (actions?.onClick) {
      container.addEventListener('click', actions.onClick);
    }
  }
}

interface ICardBasket {  
  title: string;
  price: string;
  count: number
}

export class BasketCard extends Component<ICardBasket> {
  protected _title: HTMLElement;
  protected _count: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;


  constructor(protected blockName: string, container: HTMLElement, actions?: IActions) {
    super(container);
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._count = ensureElement<HTMLElement>(`.basket__item-index`, container);
    this._button = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);


    if (actions?.onClick) {
      this._button.addEventListener('click', actions.onClick);
    }
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  set price(value: string) {
    this.setText(this._price, value + ' синапсов');
  }

  set count(value: number) {
    this.setText(this._count, value);
  }

}