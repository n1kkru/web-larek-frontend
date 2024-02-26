import { ensureElement } from '../utils/utils';
import {IForm} from './Form';
import { Component } from './base/Component';
import { IEvents } from './base/events';

//базовый компонент
export interface IModal {
  content: HTMLElement;
  // open(): void;
  // сlose: (event: MouseEvent) => void;
  // render(): HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _closeButton: HTMLElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(data: HTMLElement) {
    this._content.replaceChildren(data);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open')
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close')
  }

  render(data: IModal): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}