// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6366F1' },   // indigo-500
    secondary: { main: '#06B6D4' }, // cyan-500
    success: { main: '#22C55E' },
    warning: { main: '#F59E0B' },
    error:   { main: '#EF4444' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#475569' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    h5: { fontWeight: 700, letterSpacing: -0.2 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiContainer: { defaultProps: { maxWidth: 'lg' } },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(90deg, rgba(99,102,241,0.95) 0%, rgba(6,182,212,0.95) 100%)'
        }
      }
    },
    MuiButton: {
     defaultProps: { size: 'medium' },
     styleOverrides: {
       root: { borderRadius: 12, height: 40, fontWeight: 600 },
       containedPrimary: { boxShadow: 'none' },
       outlined: { borderColor: '#E2E8F0' }
     }
   },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            '0 1px 2px rgba(2,6,23,0.04), 0 10px 24px rgba(99,102,241,0.10)'
        }
      }
    },
    MuiRating: { styleOverrides: { iconFilled: { color: '#FDB022' } } }
  }
});

export default theme;
