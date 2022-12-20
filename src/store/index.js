import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import totalPriceReducer from './totalprice/totalPriceSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    totalprice: totalPriceReducer
  },
})
