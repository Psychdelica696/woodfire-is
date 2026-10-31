// Страва електронного меню (таблиця dishes, л.р. №3).
export class Dish {
  constructor({ id, name, categoryId, price, modifiers = [], isAvailable = true }) {
    if (!name) throw new Error('Назва страви обов\'язкова');
    if (!(price > 0)) throw new Error('Ціна страви має бути додатною');
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.price = price;
    this.modifiers = modifiers; // [{ id, name, extraPrice }]
    this.isAvailable = isAvailable;
  }
}
