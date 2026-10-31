// Бізнес-правила піцерії, які може змінювати власник.
export const BUSINESS_RULES = {
  CURRENCY: 'UAH',
  MAX_ACTIVE_ORDERS: 50,      // нефункціональна вимога SRS
  BONUS_RATE: { base: 0.05, gold: 0.07 }, // base — осіння акція 5 %, gold — від 10 замовлень за місяць
  MAX_BONUS_SHARE: 0.5,       // бонусами можна сплатити не більше 50 % замовлення
};
