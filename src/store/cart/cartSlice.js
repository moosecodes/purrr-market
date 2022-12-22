import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice( {
  name: 'cart',
  initialState: {},
  reducers: {
    getCurrentCart: (state) => state.cart,
    clearCart: () => {
      return {}
    },
    setCart: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    addItemToCart: (state, action) => {
      if(state.hasOwnProperty(action.payload.id)) {
        state[action.payload.id].quantity++
      } else {
        state[action.payload.id] = {
          ...action.payload,
          quantity: 1
        }
      }
      return state
    },
    removeItemFromCart: (state, action) => {
      const { [action.payload]: id, ...rest } = state
      return rest
    }
  }
})

export const { getCurrentCart, setCart, addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
