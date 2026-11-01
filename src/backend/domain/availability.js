// FR-1.3: страва позначається тимчасово недоступною, якщо на складі
// не вистачає хоча б одного інгредієнта для однієї порції (Issue #1).

export function isDishAvailable(dishId, recipes, stock) {
  return (recipes.get(dishId) ?? []).every((r) => {
    const ing = stock.get(r.ingredientId);
    return ing !== undefined && ing.stockQty >= r.quantity;
  });
}

export function refreshAvailability(dishes, recipes, stock) {
  for (const dish of dishes) {
    dish.isAvailable = isDishAvailable(dish.id, recipes, stock);
  }
  return dishes.filter((d) => !d.isAvailable).map((d) => d.name);
}
