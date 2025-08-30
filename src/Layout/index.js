import React, { useEffect, useState } from 'react';
import Gallery from '../Components/Gallery';
import Header from '../Components/Header';
import Cart from '../Components/Cart';
import Grid from '@mui/material/Grid';
import SpeedDial from '../Components/SpeedDial';
import { InView } from 'react-intersection-observer';

export default function Layout() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts().then(() => setError(false));
    console.log(error);
  }, [error]);

  const fetchProducts = async () => {
    fetch(process.env.REACT_APP_CAT_API_URL, {
      headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY },
    })
      .then((res) => res.json())
      .then((cats) => setProducts((prev) => [...prev, ...cats]))
      .catch((e) => setError(e));
  };

  // const fetchBreeds = async () => {
  //   fetch('https://api.thecatapi.com/v1/breeds', {
  //     headers: { 'x-api-key': process.env.REACT_APP_CAT_API_KEY }
  //   })
  //     .then(res => res.json())
  //     .then(console.log)
  //     .catch(console.log)
  // }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12} sm={10}>
          <h2>{products.length} cats loaded</h2>
          <Gallery products={products} />
          <InView
            as="div"
            onChange={() => {
              if (products.length < 45) {
                fetchProducts().then(() => setError(false));
                // fetchBreeds().then(() => setError(false))
              }
            }}
          >
            <h2>{products.length} cats loaded</h2>
          </InView>
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
  );
}
