import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import localforage from 'localforage';

import FadeImg from '../FadeImg';
import FullScreenDialog from '../FullScreenDialog';
import { addItemToCart } from '../../store/cart/cartSlice';
import { selectCart } from '../../store/cart/selectors';

export default function Gallery({ products }) {
  const dispatch = useDispatch();
  const currentCart = useSelector(selectCart);
  const list = Array.isArray(products) ? products : [];

  return (
    <Grid container spacing={3}>
      {list.map((item, idx) => {
        const id = item?.id ?? item?.url ?? String(idx);
        const img = item?.url ?? '';
        const breedName = item?.breeds?.[0]?.name ?? 'Unknown breed';

        return (
          <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
            <Stack spacing={2}>
              <b>{breedName}</b>
              <Rating size="small" value={3} readOnly />
              {img ? <FadeImg alt={breedName} src={img} aspect="4 / 3" /> : null}
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
                Add to cart
              </Button>
              <FullScreenDialog item={item} />
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
}
