// Нефункціональна вимога SRS: система обробляє до 50 активних замовлень одночасно.
// Перевірка, чи можна прийняти нове замовлення без перевищення ліміту.
import { BUSINESS_RULES } from '../config/business-rules.js';

export function canAcceptOrder(activeOrders, limit = BUSINESS_RULES.MAX_ACTIVE_ORDERS) {
  if (!Number.isInteger(activeOrders) || activeOrders < 0) {
    throw new RangeError('Кількість активних замовлень має бути цілим невід\'ємним числом');
  }
  return activeOrders < limit;
}
