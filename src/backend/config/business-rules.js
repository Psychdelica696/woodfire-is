// Бізнес-правила піцерії, які може змінювати власник.
export const BUSINESS_RULES = {
  CURRENCY: 'UAH',
  MAX_ACTIVE_ORDERS: 50,      // нефункціональна вимога SRS
  BONUS_RATE: 0.03,
  MAX_BONUS_SHARE: 0.5,       // бонусами можна сплатити не більше 50 % замовлення
};
