import React, { useState, forwardRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Button,
  Stack,
  Chip,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ item }) {
  const [open, setOpen] = useState(false);

  // Safe access with fallbacks
  const breed = item?.breeds?.[0] ?? {};
  const name = breed?.name ?? 'Unknown breed';
  const origin = breed?.origin ?? '';
  const temperament = breed?.temperament ?? '';
  const description = breed?.description ?? '';
  const img = item?.url ?? '';

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Details
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {name}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Stack spacing={2}>
            {img ? (
              <Box component="img" src={img} alt={name} loading="lazy" sx={{ maxWidth: '100%', borderRadius: 2 }} />
            ) : null}

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {origin && <Chip label={`Origin: ${origin}`} />}
              {breed?.life_span && <Chip label={`Lifespan: ${breed.life_span} yrs`} />}
              {breed?.weight?.metric && <Chip label={`Weight: ${breed.weight.metric} kg`} />}
            </Stack>

            {temperament && (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {temperament}
              </Typography>
            )}

            {description && <Typography variant="body1">{description}</Typography>}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
