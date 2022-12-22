import React, {useEffect, useState} from 'react'
import Gallery from '../Components/Gallery'
import Header from "../Components/Header";
import Cart from "../Components/Cart"
import Grid from "@mui/material/Grid";
import SpeedDial from "../Components/SpeedDial"

export default function Layout() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts().then(() => setError(false))
    console.log(error)
  }, [])

  const fetchProducts = async ()=>  {
    fetch(process.env.REACT_APP_CAT_API_URL, {
      headers: { 'x-api-key' : process.env.REACT_APP_CAT_API_KEY }
    })
      .then(res => res.json())
      .then(cats => setProducts(prev => [...prev, ...cats]))
      .catch(e => setError(e))
  }

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>

      <Grid item xs={12} sm={10}>
        <Gallery products={products} />
      </Grid>

      <Grid item xs={0} md={2}>
        <Cart />
      </Grid>

      <Grid item xs={12}>
        <footer />
      </Grid>

      <SpeedDial />

    </Grid>
  </>
}
