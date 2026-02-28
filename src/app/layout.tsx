
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme, lightTheme } from "@/theme";

import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode] = useState(true);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Rafi Ullah | Full Stack Developer</title>
        <meta name="description" content="Professional portfolio of Rafi Ullah, Full Stack Developer specializing in React, Node.js, and Python." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="full stack developer, react developer, node.js, python, web development" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
