import './scss/styles.scss';
import { WebAPI } from './components/ApiLarek';
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { Modal } from './components/Modal';
import { BasketModel } from './components/BasketModel';
import { BasketCard, Card, GalleryItem } from './components/Card';
import { IBasketItem, FormErrors, IItem, IOrder, PaymentType } from './types';
import { Catalog } from './components/Catalog';
import { OrderAddress, OrderContacts, OrderSuccess } from './components/Order';
import { BasketView } from './components/BasketView';

const events = new EventEmitter();
const api = new WebAPI(CDN_URL, API_URL);

// шаблоны
const modalSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardInCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modalCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardInBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// компоненты представления
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderAddress = new OrderAddress(cloneTemplate(formOrderTemplate), events);
const orderContacts = new OrderContacts(cloneTemplate(formContactsTemplate), events);

// модели данных
const basketModel = new BasketModel();
const order: IOrder = {
  payment: null,
  address: '',
  email: '',
  phone: '',
  items: [''],
  total: 0,
};
let formErrors: FormErrors = {};

// загрузка каталога 
events.on('catalog:loading', (catalog: Catalog) => {
   page.catalog = catalog.getItems().map((item) => {
    const card = new GalleryItem(
      'card',
      cloneTemplate(cardInCatalogTemplate), 
      {onClick: () => events.emit('card:open', item)}
    );    
    return card.render({
        title: item.title,
        image: item.image,
        price: item.price,
        category: item.category
    });
  });
});

// Открыть карточку
events.on('card:open', (item: IItem) => {
  if(item) {
    showItem(item);
  }
  else {
    modal.close();
  }

  function showItem(item: IItem) {
    const card = new Card(
      'card', 
      cloneTemplate(modalCardTemplate),
      {onClick: () => events.emit('product:add', {
        id: item.id,
        title: item.title,
        price: item.price
      })  
    });

    modal.render({
      content: card.render({
        title: item.title,
        image: item.image,
        description: item.description,
        price: item.price,
        category: item.category
      })
    });
  }
});

// Добавить в корзину
events.on('product:add', (basketItem : IBasketItem) => {
  basketModel.add(basketItem);
  page.counter = basketModel.getCount();
})

// Отобразить корзину
events.on('basket:open', () => {
  let iCount: number = 0;  // счетчик товаров в корзине
  basketView.items = basketModel.getItems().map( (item) =>  {
    iCount += 1;
    const card = new BasketCard(
      'card',
      cloneTemplate(cardInBasketTemplate), 
      {onClick: () => events.emit('product:remove', item)}
    );
    return card.render({
        count: iCount,
        title: item.title,
        price: String(item.price),
    });
  });
  basketView.total = basketModel.getTotal();

  modal.render({
    content: basketView.render()
  })
})

// Удаление продукта
events.on('product:remove', (item: IBasketItem) => {
  basketModel.remove(item.id);
  page.counter = basketModel.getCount();
  events.emit('basket:open');
})

// Начать оформление (открывается Order)
events.on('order:start', (data : {valid: boolean}) => { 
  modal.render({
    content: orderAddress.render({
        payment: order.payment,
        address: order.address,
        valid: data.valid,
        errors: []
    })
  });
});

// Продолжить офромление (открывается OrderContacts)
events.on('order:submit', (data : {valid: boolean}) => { 
  modal.render({
    content: orderContacts.render({
        phone: order.phone,
        email: order.email,
        valid: data.valid,
        errors: []
    })
  });
});

// Учпешное оформление (открывается OrderSuccess)
events.on('contacts:submit', () => { 
  order.items = basketModel.getItems().map(item => item.id);
  order.total = basketModel.getTotal();
  
  api.postOrder(order)
    .then( (res) => {
      const orderSuccess = new OrderSuccess(cloneTemplate(modalSuccessTemplate),  {
        onClick: () => {
            modal.close();
            basketModel.clear();
            events.emit('auction:changed');
            page.counter = basketModel.getCount();
        }
      });
      orderSuccess.total = res.total;
      modal.render({
        content: orderSuccess.render({})
      });
    })
    .catch(err => {
        console.error(err);
    });
});

// Изменяется поле ввода
events.on(/^order\..*:change/, (data: { field?: keyof IOrder, value: string }) => {
  if(data.field === 'address') {
    order.address = data.value;
  }
  else {
    order.payment = data.value as PaymentType;
  }

  if (validateAddress()) {
    events.emit('order:start', {valid: true});
  }

  function validateAddress() {
    const errors: FormErrors = {};
    if (!order.address) {
        errors.address = 'Необходимо указать email';
    }
    if (!order.payment) {
        errors.payment = 'Необходимо указать телефон';
    }
    formErrors = errors;
    events.emit('formErrors:change', formErrors);
    return Object.keys(errors).length === 0;
  }
  
});

events.on(/^contacts\..*:change/, (data: { field?: keyof IOrder, value: string }) => {
  if(data.field === 'email') {
    order.email = data.value;
  }
  else if(data.field === 'phone') {
    order.phone = data.value;
  }

  if (validateContacs()) {
    events.emit('order:submit', {valid: true});
  }

  function validateContacs() {
    const errors: FormErrors = {};
    if (!order.email) {
        errors.email = 'Необходимо указать email';
    }
    if (!order.phone) {
        errors.phone = 'Необходимо указать телефон';
    }
    formErrors = errors;
    events.emit('formErrors:change', formErrors);
    return Object.keys(errors).length === 0;
  }
  
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
  page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
  page.locked = false;
});

api.getProductList()
.then( (data) => {
  const catalog = new Catalog(data);
  events.emit('catalog:loading', catalog);  
})
.catch(err => {
    console.error(err);
});