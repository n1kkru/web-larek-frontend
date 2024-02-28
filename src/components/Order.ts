import { IActions, IOrderAddress, IOrderContacs, IOrderSuccess, PaymentType } from "../types";
import { ensureElement } from "../utils/utils";
import { Form } from "./Form";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";


export class OrderAddress extends Form<IOrderAddress> {
  protected _payment: PaymentType;
  protected _address: string;
  protected _addressField: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    const fields = this.container.elements;
    this._addressField = fields.namedItem('address') as HTMLInputElement;
    const cardButton = fields.namedItem('card') as HTMLInputElement;
    const cashButton = fields.namedItem('cash') as HTMLInputElement;

     cardButton.addEventListener('click', () => {
      events.emit(`${this.container.name}.:change`, {value: 'card'});
      cardButton.classList.add('button_alt-active');
      cashButton.classList.remove('button_alt-active');
    })

    cashButton.addEventListener('click', () => {
      events.emit(`${this.container.name}.:change`, {value: 'cash'});
      cashButton.classList.add('button_alt-active');
      cardButton.classList.remove('button_alt-active');
    })
  }

  set payment(value: PaymentType) {
    this._payment = value;
  }

  get payment() : PaymentType {
    return this._payment;
  }

  set address(value: string) {
    this._addressField.value = value;
  }

  get address() : string {
    return this._addressField.value;
  }
}

export class OrderContacts extends Form<IOrderContacs> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    const fields = this.container.elements;
    this._email = fields.namedItem('email') as HTMLInputElement;
    this._phone = fields.namedItem('phone') as HTMLInputElement;
  }

  set email(value: string) {
    this._email.value = value;
  }

  get email() : string {
    return this._email.value;
  }

  set phone(value: string) {
    this._phone.value = value;
  }

  get phone() : string {
    return this._phone.value;
  }
}

export class OrderSuccess extends Component<IOrderSuccess> {
  protected _total: HTMLElement;
  protected _close: HTMLElement;

  constructor(container: HTMLElement, actions: IActions) {
      super(container);

      this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
      this._close = ensureElement<HTMLElement>('.order-success__close', this.container);

      if (actions?.onClick) {
          this._close.addEventListener('click', actions.onClick);
      }
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${String(value)} синапсов`);
  }

}
