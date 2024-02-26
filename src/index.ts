import './scss/styles.scss';
import { WebAPI } from './components/ApiLarek';
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from './components/base/events';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { Modal } from './components/Modal';
import { IBasketItem, BasketView, BasketModel } from './components/Basket';
import { Card, GalleryItem } from './components/Card';
import { Success } from './components/Success';
import { IItem } from './types';
import { Catalog } from './components/Catalog';

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

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
// const order = new Order(cloneTemplate(orderTemplate), events);

const basketModel = new BasketModel();

// загрузка каталога 
events.on('catalog:loading', (catalog: Catalog) => {
   page.catalog = catalog.items.map((item) => {
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

// Отправлена форма заказа
// events.on('order:submit', () => {
//   // POST order
//   api.postOrder(appData.order)
//       .then((result) => {
//           // если успешно, то формируем модалку 
//           const success = new Success(cloneTemplate(modalSuccessTemplate), {
//               onClick: () => {
//                   modal.close();
//                   appData.clearBasket();
//                   // events.emit('auction:changed');
//               }
//           });

//           modal.render({
//               content: success.render({})
//           });
//       })
//       .catch(err => {
//           console.error(err);
//       });
// });

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
  console.log(basketModel.getItems());
})

api.getProductList()
.then( (data) => {
  const catalog = new Catalog(data);
  events.emit('catalog:loading', catalog);  
})
.catch(err => {
    console.error(err);
});