# Проектная работа "Веб-ларек"

Используемый стек: HTML, SCSS, TS, Webpack


## Описание данных

```TypeScript
type PaymentType = 'card' | 'cash';
```
- тип описывающий способ оплаты ("онлайн" или "при получении"). Используется в интерфейсе **IOrderAddress**

Интерфейс для единицы товара в корзине.
```TypeScript
interface IBasketItem {
  id: string;         // идентификатор товара
  title: string;      // имя товара
  price: number;      // цена
}
```
Интерфейс для единицы товара в карточке расширяет интерфейс товара корзины.
```TypeScript
export interface IItem extends IBasketItem {
  category: string;   // категория
  description: string;// описание
  image: string;      // изображение
}
```
В нем содержаться поля об идентификаторе, названии, категории товара, описание товара, изображение товара и цена.

Интерфейс 
```TypeScript
interface IOrderAddress {
  payment: PaymentType | null;
  address: string;
}
```
реализует класс для формы адреса.

А интерфейс 
```TypeScript
interface IOrderContacs {
  email: string;
  phone: string;
}
```
реализует класс для формы контактных данных.

Для отправки оформленного заказа на сервер используется интерфейс 
```TypeScript
export interface IOrder extends IOrderAddress, IOrderContacs {
  items: string[];
  total: number;
}
```
А подтверждение проходит в виде
```TypeScript
export interface IOrderSuccess {
  total: number
}
```

Интерфейс 
```TypeScript
export interface IOrderSuccess {
  total: number
}
```
используется в классах **OrderSuccess**, **Card** для метода onClick.


## Базовые классы

### 1. Класс **EventEmitter**
Обеспечивает работу событий. Позволяет установить и снять слушателей событий, вызвать слушателей при возникновении события».
Имеет методы **on**, **off**, **emit** - для подписки, отписки на событие и вызове подписчика при событии.

### 2. Класс **Api**
Содержит методы для работы с api. **get** для получения, **post** для размещения данных.

### 3. Класс **Component**
Является базовым для всех компонентов представления. Метод **setDisabled** используется для блокировки кнопок, **setImage** для того, чтобы установить изображение с алтернативным текстом, **render** возвращает DOM элемент.


## Модели данных

### 1. Класс **Catalog**
Данный класс имплементирует такой интерфейс:
```TypeScript
interface ICatalog {
  _items: IItem[];
  add(item: IItem): void;
  addList(itemList: IItem[]): void;
  getItem(id: string): IItem;
  getItem(id: string): IItem;
}
```
Класс хранит список товаров предстваленных на главном экране. Методы позволяют добавить один товар или список товаров, и получить выбранный продукт по id или все сразу.

### 2. Класс **Basket**
Модель корзины реализована через интерфейс
```TypeScript
interface IBasketModel {
  _items: IBasketItem[];
  add(newItem: IBasketItem): void;
  remove(id: string) : void;
  clear(): void;
  getItems(): IBasketItem[];
  getCount() : number;
}
```
Класс содержит в себе поле для хранения списка товаров в корзине, а также методы для добавления и удаления элементов корзины, полной очистки корзины, получения списка товаров и количества товаров в корзине.

### 3. Класс **WebAPI**
```TypeScript
interface IWebAPI {
  getProductList: () => Promise<IItem[]>;
  getItem: (id: string) => Promise<IItem>;
  postOrder: (order: IOrder) => Promise<IOrderSuccess>;
}
```
Содержит методы для взаимодействаия с сервером. GET запросы на получение списка товаров и одного товара по id. POST запросдля оформления заказа.


## Компоненты представления

### 1. Класс **Modal**
В файле **Modal.ts** описан интерфейс **базовой** компоненты:
```TypeScript 
interface IModal {
  content: HTMLElement;
}
```
Класс **Modal** содержит метод **close**, который отвечает за закрытие модального окна. Метод **open** для открытия и **render**, который отвечает за то, чтобы вернуть DOM-элемент.

### 2. Класс **Form**
**Базовую** компоненту для описания формы содержит файл **Form.ts**:
```TypeScript 
interface IForm {
    errors: string[];
    valid: boolean;
}
```
Класс формы содержит метод для события изменения поля ввода:
```TypeScript 
onInputChange(field: keyof T, value: string) {  
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
        field,
        value
    });
  }
```

### 3. Класс **Page**
Основной компонентой представления является класс **Page**, имплементированный от интерфейса
```TypeScript
interface IPage {
    catalog: HTMLElement;
    basket: HTMLButtonElement;
    counter: HTMLElement;
}
```
Включает в себя div-элемент каталога товаров, кпопку для элемента корзины и счетчик товаров. Кнопка инициирует событие открытия корзины:
```TypeScript
this._basket.addEventListener('click', () => {            
    this.events.emit('basket:open');
})
```

### 3. Классы **Card**, **GalleryItem** и **BasketCard**
В каталоге содержится компонента карточки товаров с интерфейсом
```TypeScript
interface ICard {
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
}
```
В ней есть поля для названия товара, изображения, категории, цены и метод **onClick** для добавления товара в корзину. 
А в дочерний класс **GalleryItem** отрисовывается в каталоге товаров и переопределеяет метод **onClick** для открытия полного описания карточки.
**BasketCard** описывает карточку в корзине: номер товара, название, цена и кнопка удаления. Реализован через интерфейс: 
```TypeScript
interface ICardBasket {  
  title: string;
  price: string;
  count: number
}
```

### 4. Класс **BasketView**
Сам элемент корзины описан интерфейсом
```TypeScript
interface IBasketView {
  items: HTMLElement[];
  total: number;
}
```
Здесь есть список товаров и общая сумма заказа и кнопка "Оформить" для открытия модальных окон с формами оформления заказа. 

### 5. Классы **OrderAddress**, **OrderContacts**
Данные классы наследуются от компоненты формы и реализуют ее заполнение. 
**OrderAddress** для способа оплаты и адреса. Кнпка "Далее" открывает другую форму -  **OrderContacts** - для полей телефона и почты. В нем кнопка "Оплатить" открывет модальное окно с сообщением об успешной покупке.

### 6. Класс **OrderSuccess**
Данная компонента выводит текст об успешной покупке и сумму покупки.



## Описание событий

Для работы с событиями используется **EventEmitter**.
- при загрузке страницы работает событие **'catalog:loading'**, который загружает список товаров,
- при клике на карточку товара срабатывает событие **'card:open'**, открывающее модальное окно с подробной информацией,
- при клике на иконку корзины вызывается событие **'basket:open'**, открывающее модальное окно с корзиной,
- нажимая на кнопку "В корзину" работает событие **'product:add'**, добавляющее выбранный товар в корзину,
- удалить продукт из корзины можно при нажатии на кнопку удаления, тогда сработает событие **'product:remove'**,
- если в корзине кликнуть на кнопку "Оформить", то сработает событие **'order:start'** и откроется модальное окно оформления заказа,
- кнопка "Далее" открывает следующее модальное окно при событии **'order:submit'**,
- кнопка "Оплатить" открывает следующее модальное окно при успешной покупке - **'contacts:submit'**,
- события **'modal:open'** и **'modal:close'** блокируют и разблокируют прокрутку страницы про открытии модалки,
- при изменении полей ввода форм срабатываюет события **'/^order\..*:change/'**.


Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
