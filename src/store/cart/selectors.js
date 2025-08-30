// Basic selectors for the cart
export const selectCart = (state) => state.cart.items;

export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

export const selectCartIds = (state) => Object.keys(state.cart.items);
