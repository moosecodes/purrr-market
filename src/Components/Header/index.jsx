import React, { useEffect, useMemo, useRef, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, Typography, InputBase, Button, IconButton,
  Popper, Paper, List, ListItemButton, ListItemText, ClickAwayListener, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// import Logo from './assets/logo-mark.svg';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(1), width: 'auto' }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: { width: '20ch', '&:focus': { width: '24ch' } }
  }
}));

const norm = (s) =>
  String(s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

export default function Header({
  query,                 // controlled typing value
  onQueryChange,         // set typing value
  onSearchSubmit,        // run filter
  onClear,               // clear typing + applied query
  suggestions = []       // array of breed names from LOADED cats
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const searchRef = useRef(null);

  // filter suggestions based on current query
  const filtered = useMemo(() => {
    const q = norm(query).trim();
    if (!q) return [];
    const uniq = Array.from(new Set(suggestions)); // dedupe
    return uniq
      .filter((name) => norm(name).includes(q))
      .sort()
      .slice(0, 8);
  }, [suggestions, query]);

  useEffect(() => {
    // close dropdown when query cleared
    if (!query) setOpen(false);
    setHighlight(-1);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h <= 0 ? filtered.length - 1 : h - 1));
    } else if (e.key === 'Enter' && highlight >= 0) {
      e.preventDefault();
      onQueryChange?.(filtered[highlight]);
      setOpen(false);
      onSearchSubmit?.();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClear?.();
      setOpen(false);
    }
  };

  const choose = (name) => {
    onQueryChange?.(name);
    setOpen(false); // do not auto-search; user can press Search
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #e6ecf5' }}>
        <Toolbar sx={{ gap: 2 }}>
          {/* <img src={Logo} alt="Purrr Market" height={28} /> */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            The Purrrfect Marketplace
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); onSearchSubmit?.(); }}
            sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
          >
            <Search ref={searchRef}>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>

              <StyledInputBase
                placeholder="Search By Breed"
                inputProps={{ 'aria-label': 'search by breed' }}
                value={query}
                onChange={(e) => { onQueryChange?.(e.target.value); setOpen(true); }}
                onFocus={() => { if (query) setOpen(true); }}
                onKeyDown={handleKeyDown}
              />

              {query ? (
                <IconButton
                  aria-label="clear search"
                  size="small"
                  onClick={() => { onClear?.(); setOpen(false); }}
                  sx={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: 'inherit' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              ) : null}
            </Search>

            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
              Search
            </Button>

            {/* Suggestions dropdown */}
            <Popper
              open={open && filtered.length > 0}
              anchorEl={searchRef.current}
              placement="bottom-start"
              sx={{ zIndex: (t) => t.zIndex.modal }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Paper sx={{ mt: 1, minWidth: 280, maxWidth: 420 }}>
                  <List dense role="listbox" aria-label="breed suggestions">
                    {filtered.map((name, i) => (
                      <ListItemButton
                        key={name + i}
                        selected={i === highlight}
                        onMouseDown={(e) => e.preventDefault()} // keep focus in input
                        onClick={() => choose(name)}
                      >
                        <ListItemText primary={name} />
                      </ListItemButton>
                    ))}
                  </List>
                  <Divider />
                  <Box sx={{ px: 1.5, py: 1, typography: 'caption', color: 'text.secondary' }}>
                    ↑/↓ to navigate • Enter to select • Esc to clear
                  </Box>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </Box>

          <Box sx={{ width: 24 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
