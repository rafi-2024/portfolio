'use client';

import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Header } from '@/components/Header';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function ServicesPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
    setMounted(true);

    // Handle hash-based navigation
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure elements are rendered
    }
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme-mode', newDarkMode ? 'dark' : 'light');
    
    // Trigger a page refresh to apply theme changes
    window.location.reload();
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
      <Box component="main" sx={{ flex: 1, mt: 8 }}>
        <ServicesSection />
        <ContactSection />
      </Box>
      <Footer />
    </Box>
  );
}
