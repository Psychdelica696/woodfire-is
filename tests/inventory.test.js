import { test } from 'node:test';
import assert from 'node:assert/strict';
import { writeOffByRecipe, findLowStock } from '../src/backend/domain/inventory.js';

const recipes = new Map([[1, [{ ingredientId: 10, quantity: 0.25 }, { ingredientId: 11, quantity: 0.125 }]]]);
const stock = () => new Map([
  [10, { name: 'Борошно', stockQty: 20, minQty: 5 }],
  [11, { name: 'Моцарела', stockQty: 3.2, minQty: 3 }],
]);

test('списання за рецептурою зменшує залишки', () => {
  const next = writeOffByRecipe([{ dishId: 1, quantity: 2 }], recipes, stock());
  assert.equal(next.get(10).stockQty, 19.5);
  assert.equal(next.get(11).stockQty, 2.95);
});

test('після списання формується сповіщення про мінімальний залишок', () => {
  const next = writeOffByRecipe([{ dishId: 1, quantity: 2 }], recipes, stock());
  assert.deepEqual(findLowStock(next), ['Моцарела: 2.95 (мін. 3)']);
});
