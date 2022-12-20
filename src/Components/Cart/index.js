import React from 'react'
import {useSelector} from "react-redux";
import {getCurrentCart} from "../../store/cart/cartSlice";
import Button from "@mui/material/Button";
import {Avatar} from "@mui/material";

export default function Cart() {
  const currentCart = useSelector(getCurrentCart).payload.cart

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
      >
        Checkout
      </Button></p>
  </>
}
