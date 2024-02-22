import { ensureElement } from '../utils/utils';
import {IForm} from './Form';
import { Component } from './base/Component';
import { IEvents } from './base/events';

//базовый компонент
export interface IModal {
  content: HTMLElement;
  open(): void;
  сlose: (event: MouseEvent) => void;
  render(): HTMLElement;
}

export class Modal extends Component<IModal> {
  protected _closeButton: HTMLElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._closeButton = ensureElement<HTMLElement>('modal__close');
    this._content = ensureElement<HTMLElement>('modal__content');

    this._closeButton.addEventListener('click', this.close);
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

}