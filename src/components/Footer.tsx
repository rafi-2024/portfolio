import React from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
} from '@mui/material';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, 
          rgba(10, 14, 39, 0.95) 0%,
          rgba(15, 23, 41, 0.95) 100%)`,
        borderTop: '1px solid rgba(0, 212, 255, 0.2)',
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
                  background: 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)',
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
                  color: '#B0BEC5',
                }}
              >
                Full Stack Developer & Tech Enthusiast
              </Typography>
            </Box>

            {/* Quick Links */}
            <Stack direction="row" spacing={3}>
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  sx={{
                    color: '#B0BEC5',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#00D4FF',
                    },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Divider
          sx={{
            borderColor: 'rgba(0, 212, 255, 0.2)',
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
              color: '#666',
            }}
          >
            {`© ${currentYear} Rafi Ullah. All rights reserved.`}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#666',
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
                color: '#B0BEC5',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#00D4FF',
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
                color: '#B0BEC5',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#00D4FF',
                },
              }}
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:rafi.freelancer9@gmail.com"
              sx={{
                color: '#B0BEC5',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#00D4FF',
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
