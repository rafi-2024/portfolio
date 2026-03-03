import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Mail as MailIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import avatar from '../../public/avtar.png';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Box
      component="section"
      id="about"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 10,
        pb: 10,
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, rgba(30, 136, 229, 0.05) 50%, ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-200px',
          right: '-200px',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(30, 136, 229, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          bottom: '-300px',
          left: '-300px',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          <div>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <MotionTypography
                variants={itemVariants}
                sx={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                👋 Welcome to my portfolio
              </MotionTypography>

              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontSize: isMobile ? '2.5rem' : '3.5rem',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Full Stack Developer
              </MotionTypography>

              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontSize: isMobile ? '1.3rem' : '1.8rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  mb: 3,
                  lineHeight: 1.4,
                }}
              >
                Building scalable web solutions with modern technologies and innovative design patterns.
              </MotionTypography>

              <MotionTypography
                variants={itemVariants}
                sx={{
                  fontSize: '1.05rem',
                  color: theme.palette.text.secondary,
                  mb: 4,
                  lineHeight: 1.8,
                  maxWidth: '500px',
                }}
              >
                I specialize in creating high-performance, user-centric applications. With expertise in React, Node.js, Python, and modern databases, I deliver professional solutions for businesses of all sizes.
              </MotionTypography>

              <MotionBox
                variants={itemVariants}
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 4,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  component="a"
                  href="/projects"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href="/contact"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                  }}
                >
                  Get In Touch
                </Button>
              </MotionBox>

              <MotionBox
                variants={itemVariants}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  pt: 2,
                }}
              >
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                  Connect with me:
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    component="a"
                    href="https://github.com/rafi-2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    startIcon={<GitHubIcon />}
                  >
                    GitHub
                  </Button>
                  <Button
                    component="a"
                    href="https://www.linkedin.com/in/rafi-pythonista"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    startIcon={<LinkedInIcon />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    component="a"
                    href="mailto:rafi.freelancer9@gmail.com"
                    variant="outlined"
                    size="small"
                    startIcon={<MailIcon />}
                  >
                    Email
                  </Button>
                </Stack>
              </MotionBox>
            </MotionBox>
          </div>

          <div style={{ textAlign: 'center' }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                mx: 'auto',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00D4FF 0%, #1E88E5 100%)',
                    p: 0.5,
                    animation: 'spin 3s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: theme.palette.background.default,
                      p: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={avatar}
                      alt="Rafi Ullah"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          </div>
        </Box>
      </Container>
    </Box>
  );
};
