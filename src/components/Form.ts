import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export interface IForm {
    errors: string[];
    valid: boolean;
}

export class Form<T> extends Component<IForm> {
  protected _submitButton: HTMLButtonElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this._submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container)
    
    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`, {valid: false});
    });
  }

  protected onInputChange(field: keyof T, value: string) {  
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
        field,
        value
    });
  }

  set valid(value: boolean) {
    this._submitButton.disabled = !value;
  }

  render(state: Partial<T> & IForm) {
    const {valid, ...inputs} = state;
    super.render({valid});
    Object.assign(this, inputs);
    return this.container;
  }
}