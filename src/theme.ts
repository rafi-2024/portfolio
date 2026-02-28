import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    codeBlack: string;
  }
  interface PaletteOptions {
    codeBlack?: string;
  }
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00D4FF',
      light: '#33E0FF',
      dark: '#0099BB',
      contrastText: '#000',
    },
    secondary: {
      main: '#1E88E5',
      light: '#42A5F5',
      dark: '#1565C0',
    },
    background: {
      default: '#0A0E27',
      paper: '#141B2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#F44336',
    },
    codeBlack: '#0A0E27',
  },
  typography: {
    fontFamily: '"Geist", "Geist Mono", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 212, 255, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)',
          color: '#000',
          '&:hover': {
            background: 'linear-gradient(135deg, #33E0FF 0%, #42A5F5 100%)',
          },
        },
        outlined: {
          borderColor: '#00D4FF',
          color: '#00D4FF',
          '&:hover': {
            borderColor: '#33E0FF',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a2847',
          backgroundImage: 'linear-gradient(135deg, #1a2847 0%, #0f1729 100%)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(0, 212, 255, 0.5)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(26, 40, 71, 0.8) 0%, rgba(15, 23, 41, 0.8) 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderColor: '#00D4FF',
          color: '#00D4FF',
          '&.MuiChip-filled': {
            backgroundColor: 'rgba(0, 212, 255, 0.15)',
            color: '#00D4FF',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0066BB',
      light: '#1E88E5',
      dark: '#004499',
    },
    secondary: {
      main: '#00D4FF',
      light: '#33E0FF',
      dark: '#0099BB',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    codeBlack: '#1A1A1A',
  },
  typography: {
    fontFamily: '"Geist", "Geist Mono", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: '8px',
        },
      },
    },
  },
});
