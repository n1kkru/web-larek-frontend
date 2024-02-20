export interface IForm {
  fields: HTMLFormElement[];  // список полей формы
  valid: boolean;             // валидность
  render(): HTMLElement
}