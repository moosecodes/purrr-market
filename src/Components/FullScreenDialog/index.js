import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ProductRatings from "../ProductRatings";
import {Link} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ item }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {item.breeds[0].name} Details
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {/*<IconButton*/}
            {/*  edge="start"*/}
            {/*  color="inherit"*/}
            {/*  onClick={handleClose}*/}
            {/*  aria-label="close"*/}
            {/*>*/}
            {/*  <CloseIcon />*/}
            {/*</IconButton>*/}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {item.breeds[0].name}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'center', width:'100%', height: '400px' }}>
            <img src={item.url} alt="item.id" width="auto"/>
          </ListItem>
          <ListItem>
            <ListItemText primary={item.breeds[0].name} />
          </ListItem>
          {
            item.breeds[0].alt_names &&
            <ListItem>
              <ListItemText primary="Alternative Names" secondary={item.breeds[0].alt_names}/>
            </ListItem>
          }
          <ListItem>
          <ListItemText primary="Traits" secondary={<ProductRatings item={item} />}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Origin" secondary={`${item.breeds[0].origin} (${item.breeds[0].country_code})`}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary={item.breeds[0].description} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Life Span" secondary={`${item.breeds[0].life_span} years`}/>
          </ListItem>
          <ListItem>
            <ListItemText primary="Resources"/>
          </ListItem>
          {
            item.breeds[0].vetstreet_url &&
              <ListItem>
                <ListItemText primary={
                  <Link href={item.breeds[0].vetstreet_url} target="_blank" underline="none">
                    Vet Street
                  </Link>
                }
                />
              </ListItem>
          }
          {
            item.breeds[0].vcahospitals_url &&
            <ListItem>
              <ListItemText primary={
                <Link href={item.breeds[0].vcahospitals_url} target="_blank" underline="none">
                  VCA Hospitals
                </Link>
              }
              />
            </ListItem>
          }
          {
            item.breeds[0].cfa_url &&
            <ListItem>
              <ListItemText primary={
                <Link href={item.breeds[0].cfa_url} target="_blank" underline="none">
                  CFA Street
                </Link>
              }
              />
            </ListItem>
          }
          {
            item.breeds[0].wikipedia_url &&
              <ListItem>
                <ListItemText primary={
                  <Link href={item.breeds[0].wikipedia_url} target="_blank" underline="none">
                    Wikipedia
                  </Link>
                } />
              </ListItem>
          }

          <Divider />
        </List>

      </Dialog>
    </div>
  );
}
