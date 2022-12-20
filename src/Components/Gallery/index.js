import React from "react"
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container'
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux"
import { addItemToCart, removeLastItemFromCart} from "../../store/cart/cartSlice"
import { addPrice, subtractPrice} from "../../store/totalprice/totalPriceSlice"

export default function Gallery(props) {
  const dispatch = useDispatch()

  const handleClick = (item) => {
    if(item) {
      dispatch(addItemToCart(item))
      dispatch(addPrice(+item.price))
    }
    else {
      dispatch(removeLastItemFromCart())
    }
  }

  return (
    <Container maxWidth="xlg">
      <p>
        <Button variant="contained" onClick={() => handleClick()}>Remove Last Item From Cart</Button>
      </p>
      <Grid container spacing={2}>
        { props.products.map(item =>
            <Grid item xs={12} sm={4} key={item.id}>
              <Stack direction="column" alignItems="stretch" spacing={2}>
                <img alt="picsum" src="https://picsum.photos/400/400"/>
                <Rating name="read-only" value={4} />
                <p>{item.name}: ${item.price} /unit</p>
                <p>{item.description}</p>
                <Button
                  variant="contained"
                  onClick={() => handleClick(item)}
                >Add #{item.id}</Button>
              </Stack>
            </Grid>
        )}
      </Grid>
    </Container>
  )
}
