import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Dish } from '../src/backend/domain/dish.js';
import { Order } from '../src/backend/domain/order.js';
import { calculateOrderTotal } from '../src/backend/domain/pricing.js';

const margherita = new Dish({ id: 1, name: 'Маргарита', price: 225, modifiers: [{ id: 1, name: 'Подвійна моцарела', extraPrice: 35 }] });
const lemonade = new Dish({ id: 7, name: 'Лимонад імбирний', price: 65 });

test('сума враховує модифікатори та кількість', () => {
  const order = new Order({ id: 1 }).addItem(margherita, 2, margherita.modifiers).addItem(lemonade, 2);
  assert.equal(calculateOrderTotal(order).total, 650);
});

test('акційна знижка та бонуси зменшують суму', () => {
  const order = new Order({ id: 2 }).addItem(margherita, 1).addItem(lemonade, 2);
  const r = calculateOrderTotal(order, { promotionPercent: 10, bonusToRedeem: 35 });
  assert.deepEqual(r, { subtotal: 355, discount: 35.5, bonus: 35, total: 284.5 });
});

test('бонусами можна сплатити не більше половини замовлення', () => {
  const order = new Order({ id: 3 }).addItem(lemonade, 1);
  assert.equal(calculateOrderTotal(order, { bonusToRedeem: 500 }).bonus, 32.5);
});

test('недоступну страву не можна додати до замовлення', () => {
  const off = new Dish({ id: 4, name: 'Чотири сири', price: 299, isAvailable: false });
  assert.throws(() => new Order({ id: 4 }).addItem(off), /недоступна/);
});
