import React, {useEffect, useState} from 'react'
import Gallery from '../Components/Gallery'
import Header from "../Components/Header";
import { productMock } from "../data/productMock.mock"
import Cart from "../Components/Cart"
import Grid from "@mui/material/Grid";

export default function Layout() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(productMock)
  }, [])

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={11}>
        <Gallery products={products} />
      </Grid>
      <Grid item xs={1}>
        <Cart />
      </Grid>
      <Grid item xs={12}>
        <footer />
      </Grid>
    </Grid>
  </>
}
