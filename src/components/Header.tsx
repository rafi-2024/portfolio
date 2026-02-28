import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle, isDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDarkMode 
            ? 'rgba(10, 14, 39, 0.8)' 
            : 'rgba(245, 243, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: isDarkMode
            ? '1px solid rgba(0, 212, 255, 0.2)'
            : '1px solid rgba(124, 58, 237, 0.2)',
          zIndex: 1200,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
            <Box
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                background: isDarkMode
                  ? 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)'
                  : 'linear-gradient(135deg, #7C3AED 0%, #B794F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              RAFI ULLAH
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        width: 0,
                        height: 2,
                        background: isDarkMode
                          ? 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)'
                          : 'linear-gradient(135deg, #7C3AED 0%, #B794F6 100%)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton
                onClick={onThemeToggle}
                sx={{ color: 'inherit' }}
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {!isMobile && (
                <Button
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  href="/Rafi_Ullah_Resume 2025.pdf"
                  download
                  sx={{ borderRadius: '8px' }}
                >
                  Resume
                </Button>
              )}

              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen(true)}
                  sx={{ color: 'inherit' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: isDarkMode
              ? 'rgba(10, 14, 39, 0.95)'
              : 'rgba(245, 243, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderLeft: isDarkMode
              ? '1px solid rgba(0, 212, 255, 0.2)'
              : '1px solid rgba(124, 58, 237, 0.2)',
          },
        }}
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon sx={{ color: isDarkMode ? '#00D4FF' : '#7C3AED' }} />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: isDarkMode ? 'rgba(0, 212, 255, 0.2)' : 'rgba(124, 58, 237, 0.2)' }} />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(item)}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: isDarkMode
                        ? 'rgba(0, 212, 255, 0.1)'
                        : 'rgba(124, 58, 237, 0.08)',
                    },
                  }}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ borderColor: isDarkMode ? 'rgba(0, 212, 255, 0.2)' : 'rgba(124, 58, 237, 0.2)', my: 2 }} />
          <Box sx={{ px: 2 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<FileDownloadIcon />}
              href="/Rafi_Ullah_Resume 2025.pdf"
              download
            >
              Download Resume
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
