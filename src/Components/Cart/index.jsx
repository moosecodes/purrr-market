import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, clearCart, removeItemFromCart } from '../../store/cart/cartSlice';
import { selectCart, selectCartIds, selectCartCount } from '../../store/cart/selectors';
import Button from '@mui/material/Button';
import { Avatar, Badge, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import localforage from 'localforage';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': { right: -3, top: 13, border: `2px solid ${theme.palette.background.paper}`, padding: '0 4px' }
}));

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCart);         // { [id]: item }
  const itemIds = useSelector(selectCartIds);    // [id, ...]
  const count = useSelector(selectCartCount);    // number

  // Hydrate once on mount
  useEffect(() => {
    localforage.getItem('cart').then((stored) => {
      if (stored && typeof stored === 'object') {
        dispatch(setCart(stored));               // stored should be the items map
      }
    });
  }, [dispatch]);

  const handleClear = async () => {
    dispatch(clearCart());
    await localforage.setItem('cart', {});
  };

  const handleRemove = async (id) => {
    dispatch(removeItemFromCart(id));
    const { [id]: _, ...rest } = items;
    await localforage.setItem('cart', rest);
  };

  return (
    <div>
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={count} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>

      <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={handleClear}>Clear Cart</Button>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
        {itemIds.map((id) => (
          <Stack key={id} direction="row" spacing={2} alignItems="center">
            <Avatar src={items[id]?.url} alt={items[id]?.breeds?.[0]?.name || id} />
            <strong>{items[id]?.breeds?.[0]?.name || id}</strong>
            <small>x {items[id]?.quantity || 1}</small>
            <Button variant="outlined" onClick={() => handleRemove(id)}>Remove</Button>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}
