import React from "react"
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container'
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux"
import { addItemToCart, removeLastItemFromCart} from "../../store/cart/cartSlice"
import ProductRatings from "../ProductRatings";
import localforage from "localforage";

export default function Gallery(props) {
  const dispatch = useDispatch()

  const handleClick = (item) => {
    if(item) {
      localforage.getItem('cart').then(cart => {
        localforage.setItem('cart', {...cart, item})
          .then(console.log)
          .then(console.log)
          .catch(console.log)
      })
      dispatch(addItemToCart(item))
    }
    else {
      dispatch(removeLastItemFromCart())
    }
  }

  return (
    <Container maxWidth="xlg">
      <Grid container spacing={2}>
        {
          props.products.map(item => <Grid item key={item.id} xs={12} sm={5} md={4} lg={3}>
            <Stack direction="column" alignItems="stretch" spacing={2}>
              <b>{item.breeds[0].name}</b>
              <ProductRatings
                item={item}
                description={item.breeds[0].description}
                temperament={item.breeds[0].temperament}
              />
              <img alt={item.id} src={item.url} />
              <Button
                variant="contained"
                onClick={() => handleClick(item)}
              >Add {item.breeds[0].name}
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
