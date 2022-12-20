import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: [],
  reducers: {
    getCurrentCart: (state) => state.cart,
    addItemToCart: (state, action) => {
      state.push(action.payload)
      return state
    },
    removeLastItemFromCart: (state, action) => {
      console.log(action)
      state.pop()
      return state
    }
  }
})

export const { getCurrentCart, addItemToCart, removeLastItemFromCart } = cartSlice.actions

export default cartSlice.reducer
