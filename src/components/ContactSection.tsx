import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  Send as SendIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export const ContactSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: <MailIcon sx={{ fontSize: '2rem' }} />,
      label: 'Email',
      value: 'rafi.freelancer9@gmail.com',
      href: 'mailto:rafi.freelancer9@gmail.com',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: '2rem' }} />,
      label: 'Location',
      value: 'Pakistan',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: '2rem' }} />,
      label: 'Available For',
      value: 'Freelance & Full-time Roles',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission - replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, send to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: 12,
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%,
          rgba(30, 136, 229, 0.03) 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#00D4FF',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: isMobile ? '2.5rem' : '3rem',
              fontWeight: 800,
              mb: 2,
              color: '#FFFFFF',
            }}
          >
            Let&apos;s Build Something Amazing
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: '#B0BEC5',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Whether you have a project in mind or want to discuss opportunities, I&apos;d love to hear from you.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            gap: 4,
          }}
        >
          {/* Contact Information Cards */}
          <Box>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <Stack spacing={3}>
              {contactInfo.map((info) => (
                <Box
                  key={info.label}
                  component={info.href ? 'a' : 'div'}
                  href={info.href || undefined}
                  target={info.href && !info.href.startsWith('mailto') ? '_blank' : undefined}
                  rel={info.href && !info.href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                  sx={{
                    textDecoration: 'none',
                    cursor: info.href ? 'pointer' : 'default',
                    display: 'block',
                  }}
                >
                  <MotionCard
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    sx={{
                      height: '100%',
                    }}
                  >
                  <CardContent>
                    <Box
                      sx={{
                        color: '#00D4FF',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        background: 'rgba(0, 212, 255, 0.1)',
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: '#FFFFFF',
                      }}
                    >
                      {info.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#B0BEC5',
                        fontSize: '1rem',
                      }}
                    >
                      {info.value}
                    </Typography>
                  </CardContent>
                </MotionCard>
                </Box>
              ))}

              {/* Social Links */}
              <MotionBox
                variants={itemVariants}
                sx={{
                  display: 'flex',
                  gap: 2,
                  pt: 2,
                }}
              >
                <Button
                  component="a"
                  href="https://github.com/rafi-2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  startIcon={<GitHubIcon />}
                  sx={{
                    borderColor: '#00D4FF',
                    color: '#00D4FF',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  component="a"
                  href="https://www.linkedin.com/in/rafi-pythonista"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  fullWidth
                  startIcon={<LinkedInIcon />}
                  sx={{
                    borderColor: '#00D4FF',
                    color: '#00D4FF',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    },
                  }}
                >
                  LinkedIn
                </Button>
              </MotionBox>
            </Stack>
            </motion.div>
          </Box>

          {/* Contact Form */}
          <Box>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MotionCard
                whileHover={{ y: -4 }}
              >
                <CardContent sx={{ p: 4 }}>
                  {submitStatus === 'success' && (
                    <Alert
                      severity="success"
                      sx={{
                        mb: 3,
                        backgroundColor: 'rgba(76, 175, 80, 0.15)',
                        color: '#4CAF50',
                        borderColor: '#4CAF50',
                      }}
                    >
                      Thank you for your message! I&apos;ll get back to you soon.
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert
                      severity="error"
                      sx={{
                        mb: 3,
                        backgroundColor: 'rgba(244, 67, 54, 0.15)',
                        color: '#F44336',
                        borderColor: '#F44336',
                      }}
                    >
                      Something went wrong. Please try again later.
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#FFFFFF',
                            '& fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.6)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00D4FF',
                            },
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#666',
                            opacity: 1,
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: '#B0BEC5',
                            '&.Mui-focused': {
                              color: '#00D4FF',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#FFFFFF',
                            '& fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.6)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00D4FF',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: '#B0BEC5',
                            '&.Mui-focused': {
                              color: '#00D4FF',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#FFFFFF',
                            '& fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.6)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00D4FF',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: '#B0BEC5',
                            '&.Mui-focused': {
                              color: '#00D4FF',
                            },
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={5}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#FFFFFF',
                            '& fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(0, 212, 255, 0.6)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#00D4FF',
                            },
                          },
                        }}
                        InputLabelProps={{
                          sx: {
                            color: '#B0BEC5',
                            '&.Mui-focused': {
                              color: '#00D4FF',
                            },
                          },
                        }}
                      />

                      <MotionButton
                        variant="contained"
                        size="large"
                        endIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </MotionButton>
                    </Stack>
                  </form>
                </CardContent>
              </MotionCard>
            </MotionBox>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
