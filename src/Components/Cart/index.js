import React from 'react'
import {useSelector} from "react-redux";
import {getCurrentCart} from "../../store/cart/cartSlice";
import {getCurrentTotalPrice} from "../../store/totalprice/totalPriceSlice"

export default function Cart() {
  const currentCart = useSelector(getCurrentCart).payload.cart
  const currentTotal = useSelector(getCurrentTotalPrice).payload.totalprice

  return <>
    <p><b>Total: ${currentTotal}</b></p>
    {currentCart.map((item, i) => <div key={i}>{item.name} {'$' + item.price}</div>)}
  </>
}
