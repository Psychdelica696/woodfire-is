// FR-1.2: автоматичний перерахунок суми замовлення з урахуванням модифікаторів і знижок.
import { BUSINESS_RULES } from '../config/business-rules.js';

const round2 = (v) => Math.round(v * 100) / 100;

export function calculateOrderTotal(order, { promotionPercent = 0, bonusToRedeem = 0 } = {}) {
  const subtotal = round2(order.items.reduce((sum, item) => {
    const extras = item.modifiers.reduce((s, m) => s + m.extraPrice, 0);
    return sum + (item.unitPrice + extras) * item.quantity;
  }, 0));

  const discount = round2(subtotal * promotionPercent / 100);
  const afterDiscount = subtotal - discount;
  const bonus = round2(Math.min(bonusToRedeem, afterDiscount * BUSINESS_RULES.MAX_BONUS_SHARE));

  return { subtotal, discount, bonus, total: round2(afterDiscount - bonus) };
}
