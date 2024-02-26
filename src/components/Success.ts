import { IOrderSuccess } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<IOrderSuccess> {
    protected _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this._closeButton.addEventListener('click', actions.onClick);
    }
}