import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material';
import FadeImg from '../FadeImg';
import localforage from 'localforage';

import { addItemToCart } from '../../store/cart/cartSlice';
import { selectCart } from '../../store/cart/selectors';
import FullScreenDialog from '../FullScreenDialog';

export default function Gallery({ products }) {
  const currentCart = useSelector(selectCart);
  const dispatch = useDispatch();

  const list = Array.isArray(products) ? products : [];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {list.map((item, idx) => {
          const breedName = item?.breeds?.[0]?.name ?? 'Unknown breed';
          const id = item?.id ?? item?.url ?? String(idx);
          const img = item?.url ?? '';

          return (
            <Grid item key={id} xs={12} sm={5} md={4} lg={3}>
              <Stack direction="column" alignItems="stretch" spacing={2}>
                <b>{breedName}</b>
                <Rating name="rating" value={3} readOnly />
                {img ? <FadeImg alt={breedName} src={img} /> : null}
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(addItemToCart({ ...item, id }));
                    const qty = (currentCart[id]?.quantity || 0) + 1;
                    localforage.setItem('cart', {
                      ...currentCart,
                      [id]: { ...item, id, quantity: qty }
                    });
                  }}
                >
                  Add {breedName}
                </Button>
                <FullScreenDialog item={item} />
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
