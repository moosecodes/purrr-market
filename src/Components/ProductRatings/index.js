import React from 'react'
import { styled } from '@mui/material/styles';
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";
import {Chip} from "@mui/material";
import Box from "@mui/material/Box";

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function ProductRatings({ item, description, temperament }) {
  const details = item.breeds[0]
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
  ]

  const descriptionStyles = {
    margin: '20px 0 0 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '5px',
    rowGap: '10px'
  }

  const formatQuality = (stat) => {
    // Replace underscores with spaces, capitalize first letter of each word
    return stat
      .replace('_', ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  }

  return <>
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Description</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {description}
        </Typography>
        <Box sx={descriptionStyles}>
          {
            temperament.split(',').map(t => <Stack key={t} direction="row" spacing={1}>
              <Chip label={t} variant="outlined" sx={{ alignSelf: 'stretch'}}/>
            </Stack>)
          }
        </Box>
        <Box sx={{...descriptionStyles, gap: '30px'}}>
        {
          qualities.map(stat => <div key={stat}>
            <div><small>{ formatQuality(stat) }</small></div>
            <StyledRating
              name="customized-color"
              size="small"
              value={details[stat]}
              precision={0.5}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </div>)
        }
        </Box>
      </AccordionDetails>
    </Accordion>
  </>
}
