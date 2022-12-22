import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getCurrentCart, setCart} from "../../store/cart/cartSlice";
import Button from "@mui/material/Button";
import {Avatar} from "@mui/material";
import localforage from "localforage";

export default function Cart() {
  const currentCart = useSelector(getCurrentCart).payload.cart
  const dispatch = useDispatch()
  const cachedCart = localforage.getItem('cart')

  useEffect(() => {
    cachedCart.then(cart => {
      dispatch(setCart(cart))
    })
  }, [])

  return <div>
    <b>Favorites:</b>
      {
        Object.keys(currentCart).map(
        key =>
          (<div key={currentCart[key].id}>
            <Avatar
              alt={currentCart[key].breeds[0].name}
              src={currentCart[key].url}
            />
            <span>{currentCart[key].breeds[0].name}</span>
            <small> x {currentCart[key].quantity}</small>
          </div>))
      }
    <p>
      <Button
        variant="contained"
        disabled={!Object.keys(currentCart).length}
        onClick={() => {
          dispatch(setCart(currentCart))
        }}
      >
        Save
      </Button>
    </p>
  </div>
}
