export interface ICard {
  title: HTMLElement;
  image: HTMLImageElement;
  category: HTMLElement;
  price: HTMLElement;
  onClick: (event: MouseEvent) => void;
}