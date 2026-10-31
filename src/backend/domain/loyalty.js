// Програма лояльності: нарахування бонусів після видачі замовлення.
// Рівні: base — усі клієнти; gold — від 10 замовлень за місяць.
import { BUSINESS_RULES } from '../config/business-rules.js';

export function loyaltyLevel(ordersPerMonth) {
  return ordersPerMonth >= 10 ? 'gold' : 'base';
}

export function accrueBonus(paidAmount, level = 'base') {
  const rate = BUSINESS_RULES.BONUS_RATE[level];
  if (rate === undefined) throw new Error(`Невідомий рівень лояльності: ${level}`);
  return Math.round(paidAmount * rate * 100) / 100;
}
