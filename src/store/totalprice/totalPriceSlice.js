import { createSlice } from '@reduxjs/toolkit'

export const totalPriceSlice = createSlice( {
  name: 'totalprice',
  initialState: 0,
  reducers: {
    getCurrentTotalPrice: (state) => state.totalprice,
    addPrice: (state, action) => {
      state += action.payload
      return state
    },
    subtractPrice: (state, action) => {
      state -= action.payload
      return state
    }
  }
})

export const { getCurrentTotalPrice, addPrice, subtractPrice } = totalPriceSlice.actions

export default totalPriceSlice.reducer
