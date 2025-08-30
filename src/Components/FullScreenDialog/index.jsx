import React, { useState, forwardRef } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Dialog, DialogContent,
  Slide, Button, Stack, Chip, Box
} from '@mui/material';
import FadeImg from '../FadeImg';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ item, buttonVariant = 'outlined', fullWidth = false, size = 'medium' }) {
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
      <Button variant={buttonVariant} fullWidth={fullWidth} size={size} onClick={() => setOpen(true)}>
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

            {img ? (
              <Box
                sx={{
                  width: { xs: '100%', sm: '80%', md: '50%' }, // ~half on md+
                  mx: 'auto',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3
                }}
              >
                <FadeImg alt={name} src={img} aspect="16 / 9" />
              </Box>
            ) : null}


          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
