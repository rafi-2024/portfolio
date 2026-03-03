'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Rocket as RocketIcon,
  Business as BusinessIcon,
  Star as StarIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ServiceCardsSkeleton } from './SkeletonLoaders';

const MotionCard = motion(Card);

// Map icon names from database to icon components
const iconMap: Record<string, React.ReactNode> = {
  Rocket: <RocketIcon sx={{ fontSize: '2.5rem' }} />,
  Business: <BusinessIcon sx={{ fontSize: '2.5rem' }} />,
  Star: <StarIcon sx={{ fontSize: '2.5rem' }} />,
};

// Color mapping by package order
const colorMap = ['#1E88E5', '#7C3AED', '#00D4FF'];

interface ServicePackageFromDB {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: string;
  popular: boolean;
  order: number;
  features: Array<{
    id: string;
    feature: string;
    order: number;
  }>;
}

interface ServicePackageUI extends ServicePackageFromDB {
  iconComponent: React.ReactNode;
  color: string;
}

const fallbackPackages = [
  {
    id: '1',
    name: 'Starter Package',
    icon: 'Rocket',
    price: '$2,999',
    order: 0,
    popular: false,
    description: 'Perfect for startups and small businesses looking to establish their digital presence',
    features: [
      { id: '1', feature: 'Responsive Website (Up to 5 pages)', order: 0 },
      { id: '2', feature: 'Modern UI/UX Design', order: 1 },
      { id: '3', feature: 'Mobile Optimization', order: 2 },
      { id: '4', feature: 'Contact Form Integration', order: 3 },
      { id: '5', feature: 'Basic SEO Setup', order: 4 },
      { id: '6', feature: '30 Days Post-Launch Support', order: 5 },
      { id: '7', feature: 'Free SSL Certificate', order: 6 },
      { id: '8', feature: 'Social Media Integration', order: 7 },
    ],
  },
  {
    id: '2',
    name: 'Professional Package',
    icon: 'Business',
    price: '$5,999',
    order: 1,
    popular: true,
    description: 'Ideal for growing businesses needing advanced features and custom functionality',
    features: [
      { id: '9', feature: 'Everything in Starter Package', order: 0 },
      { id: '10', feature: 'Custom Web Application', order: 1 },
      { id: '11', feature: 'Database Integration', order: 2 },
      { id: '12', feature: 'User Authentication System', order: 3 },
      { id: '13', feature: 'Admin Dashboard', order: 4 },
      { id: '14', feature: 'API Development & Integration', order: 5 },
      { id: '15', feature: 'Payment Gateway Integration', order: 6 },
      { id: '16', feature: 'Advanced SEO & Analytics', order: 7 },
      { id: '17', feature: '60 Days Post-Launch Support', order: 8 },
      { id: '18', feature: 'Performance Optimization', order: 9 },
    ],
  },
  {
    id: '3',
    name: 'Enterprise Package',
    icon: 'Star',
    price: '$12,999',
    order: 2,
    popular: false,
    description: 'Comprehensive solution for large-scale applications with complex requirements',
    features: [
      { id: '19', feature: 'Everything in Professional Package', order: 0 },
      { id: '20', feature: 'Microservices Architecture', order: 1 },
      { id: '21', feature: 'Cloud Infrastructure Setup (AWS/Azure)', order: 2 },
      { id: '22', feature: 'Real-time Features (WebSockets)', order: 3 },
      { id: '23', feature: 'Advanced Security Implementation', order: 4 },
      { id: '24', feature: 'Third-party API Integrations', order: 5 },
      { id: '25', feature: 'CI/CD Pipeline Setup', order: 6 },
      { id: '26', feature: 'Load Balancing & Scalability', order: 7 },
      { id: '27', feature: 'Custom CRM/Dashboard Development', order: 8 },
      { id: '28', feature: '90 Days Post-Launch Support', order: 9 },
      { id: '29', feature: 'Dedicated Project Manager', order: 10 },
      { id: '30', feature: 'Priority Support & Maintenance', order: 11 },
    ],
  },
];

export const ServicesSection: React.FC = () => {
  const [packages, setPackages] = useState<ServicePackageUI[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mapToUIPackages = (data: ServicePackageFromDB[]) => {
    return data.map((pkg, index) => ({
      ...pkg,
      iconComponent: iconMap[pkg.icon] || iconMap.Rocket,
      color: colorMap[index % colorMap.length],
    }));
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          setPackages(mapToUIPackages(fallbackPackages));
          return;
        }

        const data = (await response.json()) as ServicePackageFromDB[];
        setPackages(mapToUIPackages(data && data.length > 0 ? data : fallbackPackages));
      } catch {
        setPackages(mapToUIPackages(fallbackPackages));
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleContactClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    router.push('/contact');
  };

  if (loading) {
    return (
      <Box component="section" id="services" sx={{ py: 12 }}>
        <ServiceCardsSkeleton />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="services"
      sx={{
        py: 12,
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%,
          rgba(124, 58, 237, 0.03) 50%,
          ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '-300px',
          right: '-200px',
          pointerEvents: 'none',
        },
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
            Service Packages
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
            Tailored Solutions for Clients
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Choose the perfect package that fits your business needs. All packages include source code ownership and transparent communication.
          </Typography>

          <Box
            sx={{
              mt: 4,
              mx: 'auto',
              maxWidth: '820px',
              p: 3,
              borderRadius: 3,
              border: `1px solid ${theme.palette.primary.main}33`,
              backgroundColor: `${theme.palette.primary.main}0D`,
              textAlign: 'left',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1.5,
              }}
            >
              <LanguageIcon sx={{ color: theme.palette.primary.main }} />
              International Client Delivery
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                lineHeight: 1.8,
              }}
            >
              I collaborate with international clients through asynchronous workflows, timezone-aware planning, and milestone-based delivery. You receive clear updates, documented handoffs, and predictable execution from kickoff to launch.
            </Typography>

            <List sx={{ py: 0 }}>
              {[
                'Timezone-friendly communication windows and weekly progress updates',
                'Structured delivery in milestones with demos and acceptance checkpoints',
                'Clean documentation and code handover for distributed teams',
                'Remote-first collaboration with transparent scope, timeline, and costs',
              ].map((point) => (
                <ListItem key={point} sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon sx={{ color: theme.palette.primary.main, fontSize: '1.1rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={point}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      color: theme.palette.text.primary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box
          component={motion.div}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            position: 'relative',
            zIndex: 1,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {packages.map((pkg) => (
            <MotionCard
              key={pkg.name}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              sx={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: pkg.popular ? `2px solid ${pkg.color}` : 'none',
                boxShadow: pkg.popular
                  ? `0 8px 32px rgba(124, 58, 237, 0.3)`
                  : theme.shadows[4],
                transition: 'all 0.3s ease',
                overflow: 'visible',
              }}
            >
              {pkg.popular && (
                <Chip
                  label="MOST POPULAR"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 20,
                    backgroundColor: pkg.color,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    height: '24px',
                    zIndex: 1,
                  }}
                />
              )}

              <CardContent
                sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${pkg.color}15, ${pkg.color}30)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: pkg.color,
                    mb: 3,
                  }}
                >
                  {pkg.iconComponent}
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {pkg.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                    minHeight: '60px',
                  }}
                >
                  {pkg.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: pkg.color,
                      display: 'inline',
                    }}
                  >
                    {pkg.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{
                      color: theme.palette.text.secondary,
                      ml: 1,
                    }}
                  >
                    / project
                  </Typography>
                </Box>

                <List sx={{ mb: 3, flexGrow: 1 }}>
                  {pkg.features.map((featureObj, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        py: 1,
                        px: 0,
                        alignItems: 'flex-start',
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: '32px', mt: 0.5 }}>
                        <CheckCircleIcon
                          sx={{
                            color: pkg.color,
                            fontSize: '1.25rem',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={featureObj.feature}
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          color: theme.palette.text.primary,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant={pkg.popular ? 'contained' : 'outlined'}
                  onClick={handleContactClick}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '8px',
                    textTransform: 'none',
                    ...(pkg.popular
                      ? {
                          background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}CC)`,
                          color: '#fff',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${pkg.color}DD, ${pkg.color}AA)`,
                          },
                        }
                      : {
                          borderColor: pkg.color,
                          color: pkg.color,
                          '&:hover': {
                            borderColor: pkg.color,
                            backgroundColor: `${pkg.color}10`,
                          },
                        }),
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </MotionCard>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1rem',
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            Need a custom solution? Let&apos;s discuss your specific requirements.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={handleContactClick}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: `${theme.palette.primary.main}10`,
              },
            }}
          >
            Request Custom Quote
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
