import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Dish } from '../src/backend/domain/dish.js';
import { refreshAvailability } from '../src/backend/domain/availability.js';

const recipes = new Map([
  [1, [{ ingredientId: 10, quantity: 0.25 }, { ingredientId: 11, quantity: 0.125 }]],
  [4, [{ ingredientId: 10, quantity: 0.25 }, { ingredientId: 12, quantity: 0.08 }]],
]);
const stock = new Map([
  [10, { name: 'Борошно', stockQty: 20, minQty: 5 }],
  [11, { name: 'Моцарела', stockQty: 2.95, minQty: 3 }],
  [12, { name: 'Горгонзола', stockQty: 0, minQty: 0.5 }],
]);

test('страва без потрібного інгредієнта стає недоступною', () => {
  const dishes = [
    new Dish({ id: 1, name: 'Маргарита', price: 225 }),
    new Dish({ id: 4, name: 'Чотири сири', price: 299 }),
  ];
  assert.deepEqual(refreshAvailability(dishes, recipes, stock), ['Чотири сири']);
  assert.equal(dishes[0].isAvailable, true);
  assert.equal(dishes[1].isAvailable, false);
});
