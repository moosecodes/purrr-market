import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getCurrentCart, setCart} from "../../store/cart/cartSlice";
import Button from "@mui/material/Button";
import {Avatar} from "@mui/material";
import localforage from "localforage";

export default function Cart() {
  const currentCart = useSelector(getCurrentCart).payload.cart
  const dispatch = useDispatch()

  useEffect(() => {
    localforage.getItem('cart')
      .then(cachedCart => {
        if(cachedCart) {
          localforage.setItem('cart', cachedCart)
            .then(console.log)
            .catch(console.log)
          dispatch(setCart(cachedCart))
          show(cachedCart)
        }
      })
      .catch()
      .finally()
  }, [])

  const show = (cart) => {
    let list = []
    for(const item in cart) {
      list.push(
        <div key={item.id}>
          <Avatar
            alt={cart[item].breeds[0].name}
            src={cart[item].url}
          />
          <span>{cart[item].breeds[0].name}</span>
          <small> x { cart[item].quantity}</small>
        </div>
      )
    }
    return list
  }

  return <>
    <b>Shopping Cart:</b>
    <div>{show(currentCart)}</div>
    <p>
      <Button
        variant="contained"
        disabled={!Object.keys(currentCart).length}
        onClick={() => {
          localforage.setItem('cart', currentCart)
            .then(console.log)
            .then(console.log)
            .catch(console.log)
        }}
      >
        Save
      </Button>
    </p>
  </>
}
