import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: {},
  reducers: {
    getCurrentCart: (state) => state.cart,
    addItemToCart: (state, action) => {
      if(!state.hasOwnProperty(action.payload.id)) {
        state[action.payload.id] = { ...action.payload, quantity: 1 }
      } else {
        state[action.payload.id].quantity++
      }
      return state
    },
    removeLastItemFromCart: (state) => {
      state.pop()
      return state
    }
  }
})

export const { getCurrentCart, addItemToCart, removeLastItemFromCart } = cartSlice.actions

export default cartSlice.reducer
