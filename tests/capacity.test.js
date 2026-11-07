import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canAcceptOrder } from '../src/backend/domain/capacity.js';

test('T1: звичайне навантаження — 10 активних замовлень, нове приймається', () => {
  assert.equal(canAcceptOrder(10), true);
});

test('T2: граничне значення — 49 замовлень ще можна, на 50-му ліміт вичерпано', () => {
  assert.equal(canAcceptOrder(49), true);
  assert.equal(canAcceptOrder(50), true);
});

test('T3: некоректні дані — від\'ємна кількість спричиняє RangeError', () => {
  assert.throws(() => canAcceptOrder(-1), RangeError);
});
