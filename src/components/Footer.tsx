import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { FOOTER_NAV_ITEMS } from '@/lib/siteNavigation';

export const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%,
          ${theme.palette.mode === 'dark' ? 'rgba(15, 23, 41, 0.95)' : 'rgba(235, 225, 255, 0.95)'} 100%)`,
        borderTop: `1px solid rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.2)`,
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' },
              mb: 4,
            }}
          >
            {/* Brand */}
            <Box>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  background: theme.palette.primary.main === '#7C3AED'
                    ? 'linear-gradient(135deg, #7C3AED 0%, #B794F6 100%)'
                    : 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                RAFI ULLAH
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                Full Stack Developer & Tech Enthusiast
              </Typography>
            </Box>

            {/* Quick Links */}
            <Stack direction="row" spacing={3}>
              {FOOTER_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  sx={{
                    color: theme.palette.text.secondary,
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Divider
          sx={{
            borderColor: `rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.2)`,
            my: 3,
          }}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            {`© ${currentYear} Rafi Ullah. All rights reserved.`}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Built with React, Next.js, and Material-UI
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="https://github.com/rafi-2024"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/rafi-pythonista"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:rafi.freelancer9@gmail.com"
              sx={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              Email
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
