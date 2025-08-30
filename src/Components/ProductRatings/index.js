import React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function ProductRatings({ item }) {
  const details = item.breeds[0];
  const qualities = [
    'affection_level',
    'child_friendly',
    'stranger_friendly',
    'dog_friendly',
    'adaptability',
    'social_needs',
    'health_issues',
    'energy_level',
    'shedding_level',
    'vocalisation',
  ];

  const formatQualityTitle = (stat) => {
    // Replace underscores with spaces, capitalize first letter of each word
    return stat
      .replace('_', ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  };

  return (
    <>
      <div>
        <br />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, rowGap: 2 }}>
          {item.breeds[0].temperament.split(',').map((t) => (
            <Stack key={t} direction="row" spacing={1}>
              <Chip
                label={t}
                variant="outlined"
                sx={{ alignSelf: 'stretch' }}
              />
            </Stack>
          ))}
        </Box>
        <br />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, rowGap: 2 }}>
          {qualities.map((stat) => (
            <div key={stat}>
              <div>
                <small>{formatQualityTitle(stat)}</small>
              </div>
              <StyledRating
                name="customized-color"
                size="small"
                value={details[stat]}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                readOnly
              />
            </div>
          ))}
        </Box>
      </div>
    </>
  );
}
