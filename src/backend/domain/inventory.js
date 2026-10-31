// FR-2.1: облік залишків і списання інгредієнтів за рецептурою (таблиці ingredients, recipe_items).
const round3 = (v) => Math.round(v * 1000) / 1000;

/**
 * @param {Array<{dishId:number, quantity:number}>} items  позиції замовлення
 * @param {Map<number, Array<{ingredientId:number, quantity:number}>>} recipes  рецептури страв
 * @param {Map<number, {name:string, stockQty:number, minQty:number}>} stock  залишки складу
 */
export function writeOffByRecipe(items, recipes, stock) {
  const next = new Map([...stock].map(([id, s]) => [id, { ...s }]));
  for (const item of items) {
    for (const r of recipes.get(item.dishId) ?? []) {
      const ing = next.get(r.ingredientId);
      if (!ing) throw new Error(`Інгредієнт ${r.ingredientId} відсутній на складі`);
      ing.stockQty = round3(ing.stockQty - r.quantity * item.quantity);
    }
  }
  return next;
}

// FR-2.2: перелік інгредієнтів, залишок яких досяг мінімального порогу.
export function findLowStock(stock) {
  return [...stock.values()]
    .filter((s) => s.stockQty <= s.minQty)
    .map((s) => `${s.name}: ${s.stockQty} (мін. ${s.minQty})`);
}
