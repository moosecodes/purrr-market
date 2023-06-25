import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getCurrentCart, setCart, clearCart, removeItemFromCart} from "../../store/cart/cartSlice";
import Button from "@mui/material/Button";
import {Avatar} from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import localforage from "localforage";
import Stack from "@mui/material/Stack";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
export default function Cart() {
  const currentCart = useSelector(getCurrentCart).payload.cart
  const dispatch = useDispatch()
  const cachedCart = localforage.getItem('cart')

  useEffect(() => {
    cachedCart.then(cart => dispatch(setCart(cart)))
  }, [])

  return <div>
    <Button
      variant="contained"
      disabled={!Object.keys(currentCart).length}
      onClick={() => localforage.clear().then(dispatch(clearCart()))}
    >
      Clear
    </Button>

    <IconButton aria-label="cart">
      <StyledBadge badgeContent={Object.keys(currentCart).length} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>

    <div><small>Free Delivery!</small></div>

    <br/>
    <b>Favorites:</b>
      {
        Object.keys(currentCart).map(
          key =>
            <Stack key={currentCart[key].id}>

              <Avatar
                alt={currentCart[key].breeds[0].name}
                src={currentCart[key].url}
              />

              <div>{currentCart[key].breeds[0].name}</div>

              <Button variant="outlined" onClick={() => {
                dispatch(removeItemFromCart(key))
                const {[key]: id, ...rest} = currentCart
                localforage.setItem('cart', rest)
              }}>Remove</Button>

              <small> x {currentCart[key].quantity}</small>
            </Stack>
        )
      }


  </div>
}
