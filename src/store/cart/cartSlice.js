import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = {};
    },
    setCart: (state, action) => {
      state.items = { ...state.items, ...action.payload };
    },
    addItemToCart: (state, action) => {
      const id = action.payload.id;
      const existing = state.items[id];
      if (existing) {
        state.items[id] = {
          ...existing,
          quantity: (existing.quantity || 0) + 1,
        };
      } else {
        state.items[id] = {
          ...action.payload,
          quantity: 1,
        };
      }
    },
    removeItemFromCart: (state, action) => {
      delete state.items[action.payload];
    },
  },
});

export const { clearCart, setCart, addItemToCart, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
