'use client';

import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';

interface SitePageLayoutProps {
  children: React.ReactNode;
  mainTopSpacing?: number;
}

export const SitePageLayout: React.FC<SitePageLayoutProps> = ({
  children,
  mainTopSpacing = 8,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme-mode', newDarkMode ? 'dark' : 'light');
    window.dispatchEvent(new Event('theme-mode-change'));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
      <Box component="main" sx={{ flex: 1, mt: mainTopSpacing }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
