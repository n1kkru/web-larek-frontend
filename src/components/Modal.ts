import {IForm} from './Form';

//базовый компонент
export interface IModal {
  content: HTMLElement;
  open(): void;
  сlose: (event: MouseEvent) => void;
  render(): HTMLElement;
}