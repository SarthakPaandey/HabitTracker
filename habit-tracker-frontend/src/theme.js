// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Pokémon blue
    },
    secondary: {
      main: '#ff4081', // Pokémon pink
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
    h3: {
      fontWeight: 700,
      color: '#ff5722', // Vibrant orange
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
  },
});

export default theme;
