import { test } from 'node:test';
import assert from 'node:assert/strict';
import { accrueBonus } from '../src/backend/domain/loyalty.js';
import { BUSINESS_RULES } from '../src/backend/config/business-rules.js';

test('бонус нараховується від сплаченої суми за ставкою з бізнес-правил', () => {
  assert.equal(accrueBonus(1000), 1000 * BUSINESS_RULES.BONUS_RATE);
});
