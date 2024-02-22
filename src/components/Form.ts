import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export interface IForm {
  fields: HTMLFormElement[];  // список полей формы
  valid: boolean;             // валидность
  render(): HTMLElement
}

export class Form extends Component<IForm> {
  protected _submitButton: HTMLButtonElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

  }

  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }
}