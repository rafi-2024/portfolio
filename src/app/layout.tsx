
'use client';

import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, wisteriaTheme } from "@/theme";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
    setMounted(true);
  }, []);

  const handleThemeChange = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <html lang="en" className="scroll-smooth">
        <head>
          <title>Rafi Ullah | Full Stack Developer</title>
          <meta name="description" content="Professional portfolio of Rafi Ullah, Full Stack Developer specializing in React, Node.js, and Python." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content="full stack developer, react developer, node.js, python, web development" />
        </head>
        <body className="antialiased">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Rafi Ullah | Full Stack Developer</title>
        <meta name="description" content="Professional portfolio of Rafi Ullah, Full Stack Developer specializing in React, Node.js, and Python." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="full stack developer, react developer, node.js, python, web development" />
      </head>
      <body className="antialiased">
        <ThemeProvider theme={isDarkMode ? darkTheme : wisteriaTheme}>
          <CssBaseline />
          {children && typeof children === 'object' && 'props' in children
            ? React.cloneElement(children as React.ReactElement<{onThemeChange?: (isDark: boolean) => void}>, { onThemeChange: handleThemeChange })
            : children}
        </ThemeProvider>
      </body>
    </html>
  );
}
