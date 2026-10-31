// Програма лояльності: нарахування бонусів після видачі замовлення.
import { BUSINESS_RULES } from '../config/business-rules.js';

export function accrueBonus(paidAmount) {
  return Math.round(paidAmount * BUSINESS_RULES.BONUS_RATE * 100) / 100;
}
