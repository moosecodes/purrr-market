import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: {},
  reducers: {
    getCurrentCart: (state) => state.cart,
    setCart: (state, action) => {
      state = {...state, ...action.payload}
      return state
    },
    addItemToCart: (state, action) => {
      if(state.hasOwnProperty(action.payload.id)) {
        state[action.payload.id].quantity++
      } else {
        state[action.payload.id] = { ...action.payload, quantity: 1 }
      }
      return state
    },
    removeLastItemFromCart: (state, action) => {
      delete state[Object.keys(state)[0]]
      return state
    }
  }
})

export const { getCurrentCart, setCart, addItemToCart, removeLastItemFromCart } = cartSlice.actions

export default cartSlice.reducer
