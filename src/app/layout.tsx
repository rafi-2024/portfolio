"use client";

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
    const syncThemeFromStorage = () => {
      const savedTheme = localStorage.getItem("theme-mode");
      setIsDarkMode(savedTheme !== "light");
    };

    syncThemeFromStorage();
    setMounted(true);

    window.addEventListener("storage", syncThemeFromStorage);
    window.addEventListener("theme-mode-change", syncThemeFromStorage);

    return () => {
      window.removeEventListener("storage", syncThemeFromStorage);
      window.removeEventListener("theme-mode-change", syncThemeFromStorage);
    };
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <html lang="en" className="scroll-smooth">
        <head>
          <title>Rafi Ullah | Full Stack Developer</title>
          <meta
            name="description"
            content="Professional portfolio of Rafi Ullah, Full Stack Developer specializing in React, Node.js, and Python."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="jwcG+6vAy8g2eJEOBukXAQ"
            async
          ></script>
          <meta
            name="keywords"
            content="full stack developer, react developer, node.js, python, web development"
          />
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
        <meta
          name="description"
          content="Professional portfolio of Rafi Ullah, Full Stack Developer specializing in React, Node.js, and Python."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="VRft28r9JP6A5Y6ds9cCUMlyPANlP_RipJ9f395PPWs"
        />
        <meta
          name="keywords"
          content="full stack developer, react developer, node.js, python, web development"
        />
      </head>
      <script>
        var ahrefs_analytics_script = document.createElement('script');
        ahrefs_analytics_script.async = true; ahrefs_analytics_script.src =
        'https://analytics.ahrefs.com/analytics.js';
        ahrefs_analytics_script.setAttribute('data-key',
        'jwcG+6vAy8g2eJEOBukXAQ');
        document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
      </script>

      <body className="antialiased">
        <ThemeProvider theme={isDarkMode ? darkTheme : wisteriaTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
