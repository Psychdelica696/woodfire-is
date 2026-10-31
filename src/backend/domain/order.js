// Замовлення та його позиції (таблиці orders, order_items, л.р. №3).
export const ORDER_STATUS = ['new', 'cooking', 'ready', 'done', 'cancelled'];
export const ORDER_TYPE = ['dine_in', 'takeaway', 'delivery'];

export class Order {
  constructor({ id, type = 'takeaway', channel = 'pos', customerId = null }) {
    if (!ORDER_TYPE.includes(type)) throw new Error(`Невідомий тип замовлення: ${type}`);
    this.id = id;
    this.type = type;
    this.channel = channel;
    this.customerId = customerId;
    this.status = 'new';
    this.items = [];
  }

  addItem(dish, quantity = 1, modifiers = []) {
    if (!dish.isAvailable) throw new Error(`Страва «${dish.name}» тимчасово недоступна`);
    this.items.push({ dishId: dish.id, name: dish.name, unitPrice: dish.price, quantity, modifiers });
    return this;
  }

  changeQuantity(dishId, quantity) {
    const item = this.items.find((i) => i.dishId === dishId);
    if (!item) throw new Error('Позицію не знайдено');
    if (quantity <= 0) this.items = this.items.filter((i) => i !== item);
    else item.quantity = quantity;
    return this;
  }
}
