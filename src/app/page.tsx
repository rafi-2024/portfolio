'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
      <Box component="main" sx={{ flex: 1, mt: 8 }}>
        <HeroSection />
        <Box id="about">
          <SkillsSection />
        </Box>
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </Box>
      <Footer />
    </Box>
  );
}
