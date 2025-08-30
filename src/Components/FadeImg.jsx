import React, { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export default function FadeImg({ src, alt, aspect = '4 / 3', style, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: aspect,
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: 'grey.100'
      }}
    >
      {!loaded && !failed && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', inset: 0 }}
        />
      )}

      {failed || !src ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'grey.400'
          }}
        >
          <PetsIcon fontSize="large" />
        </Box>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 400ms ease',
            display: 'block',
            ...style
          }}
          {...props}
        />
      )}
    </Box>
  );
}
