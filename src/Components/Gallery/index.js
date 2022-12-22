import React from "react"
import {useSelector, useDispatch} from "react-redux";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {addItemToCart, getCurrentCart} from "../../store/cart/cartSlice"
import ProductRatings from "../ProductRatings";
import localforage from "localforage";

export default function Gallery(props) {
  const currentCart = useSelector(getCurrentCart).payload.cart
  const dispatch = useDispatch()

  return <Container maxWidth="xlg">
      <Grid container spacing={2}>
        {
          props.products.map(item =>
            <Grid item key={item.id} xs={12} sm={5} md={4} lg={3}>
              <Stack
                direction="column"
                alignItems="stretch"
                spacing={2}
              >
                <b>{item.breeds[0].name}</b>
                <ProductRatings item={item} />
                <img alt={item.id} src={item.url} />
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addItemToCart(item))
                    localforage.setItem('cart', {...currentCart, [item.id]: item})
                  }}
                >Add {item.breeds[0].name}
                </Button>
              </Stack>
            </Grid>
          )
        }
      </Grid>
    </Container>
}
