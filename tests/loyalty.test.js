import { test } from 'node:test';
import assert from 'node:assert/strict';
import { accrueBonus, loyaltyLevel } from '../src/backend/domain/loyalty.js';
import { BUSINESS_RULES } from '../src/backend/config/business-rules.js';

test('бонус нараховується за ставкою рівня клієнта', () => {
  assert.equal(accrueBonus(1000), 1000 * BUSINESS_RULES.BONUS_RATE.base);
  assert.equal(accrueBonus(1000, 'gold'), 1000 * BUSINESS_RULES.BONUS_RATE.gold);
});

test('рівень gold надається від 10 замовлень за місяць', () => {
  assert.equal(loyaltyLevel(3), 'base');
  assert.equal(loyaltyLevel(12), 'gold');
});
