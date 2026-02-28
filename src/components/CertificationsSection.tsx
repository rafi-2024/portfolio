import React from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  EmojiEvents as CertificateIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionStack = motion(Stack);

interface Certification {
  name: string;
  issuer: string;
  status?: string;
}

export const CertificationsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const certifications: Certification[] = [
    {
      name: 'CS50 2024',
      issuer: 'Harvard / edX',
    },
    {
      name: 'Python for Everybody',
      issuer: 'Coursera',
    },
    {
      name: 'Excel Data Analysis',
      issuer: 'Udemy',
    },
    {
      name: 'Introduction to Data Science',
      issuer: 'K-Streams',
    },
    {
      name: 'Laravel',
      issuer: 'Web Educators',
      status: 'In Progress',
    },
    {
      name: 'Power BI',
      issuer: 'Mind Lusters',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Box
      component="section"
      id="certifications"
      sx={{
        py: 12,
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%,
          ${theme.palette.mode === 'dark' 
            ? 'rgba(30, 136, 229, 0.03)' 
            : 'rgba(124, 58, 237, 0.03)'} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            Professional Credentials
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              fontWeight: 800,
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            Certifications
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Continuous learning and professional development through recognized certifications
          </Typography>
        </Box>

        <MotionStack
          direction="row"
          spacing={2}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                icon={<CertificateIcon />}
                label={`${cert.name} (${cert.issuer})`}
                component="a"
                href="https://www.linkedin.com/in/rafi-pythonista"
                target="_blank"
                rel="noopener noreferrer"
                clickable
                sx={{
                  padding: '8px 4px',
                  height: 'auto',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(0, 212, 255, 0.15)'
                    : 'rgba(124, 58, 237, 0.15)',
                  color: theme.palette.primary.main,
                  border: `2px solid ${theme.palette.primary.main}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(0, 212, 255, 0.25)'
                      : 'rgba(124, 58, 237, 0.25)',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 16px ${theme.palette.primary.main}40`,
                  },
                  '& .MuiChip-icon': {
                    color: theme.palette.primary.main,
                  },
                }}
                variant="outlined"
              />
            </motion.div>
          ))}
        </MotionStack>

        {/* View Full Profile CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            View all credentials on LinkedIn
          </Typography>
          <motion.a
            href="https://www.linkedin.com/in/rafi-pythonista"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.mode === 'dark' ? '#000' : '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLElement).style.boxShadow = `0 8px 16px ${theme.palette.primary.main}60`;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)';
              (e.target as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <LinkedInIcon sx={{ fontSize: '1.2rem' }} />
            View Full Profile
          </motion.a>
        </Box>
      </Container>
    </Box>
  );
};
