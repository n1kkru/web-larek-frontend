import {ensureElement} from '../utils/utils'
import {Component} from "./base/Component";

export interface ICard {
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

  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
    super(container);
    
    if (actions?.onClick) {
      container.addEventListener('click', actions.onClick);
    }
    
    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._category = container.querySelector(`.${blockName}__category`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._description = container.querySelector(`.${blockName}__text`);
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
  }

  set price(value: number) {
    this.setText(this._price, value);
  }

  get price() : number {
    return Number(this._price.textContent);
  }

}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class GalleryItem extends Card {
  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
    super(blockName, container);

    if (actions?.onClick) {
      container.addEventListener('click', actions.onClick);
    }
  }
}