// src/Components/Cart/index.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart, clearCart, removeItemFromCart } from '../../store/cart/cartSlice';
import { selectCart, selectCartIds, selectCartCount } from '../../store/cart/selectors';
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  Button,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import localforage from 'localforage';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': { right: -3, top: 13, border: `2px solid ${theme.palette.background.paper}`, padding: '0 4px' }
}));

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCart);        // { [id]: item }
  const itemIds = useSelector(selectCartIds);   // [id,...]
  const count = useSelector(selectCartCount);   // number

  const [open, setOpen] = useState(false);

  // Hydrate once
  useEffect(() => {
    localforage.getItem('cart').then((stored) => {
      if (stored && typeof stored === 'object') dispatch(setCart(stored));
    });
  }, [dispatch]);

  const handleClear = async () => {
    dispatch(clearCart());
    await localforage.setItem('cart', {});
  };

  const handleRemove = async (id) => {
    dispatch(removeItemFromCart(id));
    const rest = { ...items };
    delete rest[id];
    await localforage.setItem('cart', rest);
  };

  return (
    <>
      {/* Toggle button + label */}
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton aria-label="cart" onClick={() => setOpen(true)}>
          <StyledBadge badgeContent={count} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <Typography
          variant="body2"
          onClick={() => setOpen(true)}
          sx={{ cursor: 'pointer', userSelect: 'none', display: { xs: 'none', sm: 'inline' } }}
        >
          View cart
        </Typography>
      </Stack>

      {/* Slide-over drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 360, p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6">Cart ({count})</Typography>
            {count > 0 ? (
              <Button size="small" variant="outlined" onClick={handleClear}>Clear Cart</Button>
            ) : (
              <Typography variant="body2" color="text.secondary">Cart is empty</Typography>
            )}
          </Stack>
          <Divider />

          <List dense sx={{ maxHeight: '70vh', overflowY: 'auto', mt: 1 }}>
            {itemIds.map((id) => {
              const it = items[id] || {};
              const name = it?.breeds?.[0]?.name || id;
              const qty = it?.quantity || 1;
              return (
                <ListItem
                  key={id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="remove" onClick={() => handleRemove(id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={it.url} alt={name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={`x ${qty}`}
                    primaryTypographyProps={{ noWrap: true }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
