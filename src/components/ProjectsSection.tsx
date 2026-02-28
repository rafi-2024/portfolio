import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

interface Project {
  title: string;
  description: string;
  long_description: string;
  technologies: string[];
  github?: string;
  live?: string;
  metrics?: string[];
}

const projects: Project[] = [
  {
    title: 'Pension Management System',
    description: 'MS-Access automated pension processing for Federal Government',
    long_description: 'Built an MS-Access-based system automating pension eligibility, calculation, case processing and audit reporting for large employee datasets as per Federal Government requirements. Implemented validation logic and calculation formulas achieving 99.8% data accuracy with zero processing errors. Reduced pension processing time by 90% through workflow automation.',
    technologies: ['MS Access', 'VBA', 'Database Design', 'Automation'],
    metrics: ['99.8% Accuracy', '90% Time Reduction', 'Gov Deployment'],
  },
  {
    title: 'Record Management Web App',
    description: 'Full-stack Flask application for organizational records',
    long_description: 'Built a full-stack Flask application with authentication, CRUD operations, and form validation for managing organizational records. Designed SQLite database schema and backend logic to ensure secure, accurate, and maintainable data handling. Reduced manual record tracking effort by ~45% through centralized digital workflows.',
    technologies: ['Flask', 'Python', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/rafi-2024/record_management_app',
    metrics: ['CS50 Project', '45% Efficiency Gain', 'Full CRUD'],
  },
  {
    title: 'Billing & Accounting System',
    description: 'Full-stack billing platform for Federal Government',
    long_description: 'Built a full-stack billing and accounting platform using Django REST, React, and PostgreSQL. Implemented secure role-based access control and REST APIs for financial transactions. Deployed and validated the system with automated tests, automating billing creation and reducing manual work by 90%.',
    technologies: ['Django', 'React', 'PostgreSQL', 'REST APIs', 'RBAC'],
    github: 'https://github.com/rafi-2024/CBC-New',
    metrics: ['90% Automation', 'Production Ready', 'Gov Standard'],
  },
  {
    title: 'Payroll PDF Parser System',
    description: 'Async payroll processing with real-time dashboard',
    long_description: 'Developed a full-stack payroll PDF parsing system using Django REST Framework and React, converting PDF data to CSV for bulk import. Implemented asynchronous processing with Celery and Redis for concurrent extraction, reducing manual processing by ~70%. Built real-time dashboard with search, filtering, and SHA256 duplicate detection. Dockerized with secure authentication and proper volume mounting.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
    github: 'https://github.com/rafi-2024/payroll-New',
    metrics: ['70% Time Reduction', 'Async Processing', 'SHA256 Validation'],
  },
];

export const ProjectsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
      id="projects"
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
              color: theme.palette.primary.main,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 2,
            }}
          >
            Portfolio Showcase
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
            Featured Projects
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
            A selection of my most impactful projects showcasing full-stack development expertise.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
            gap: 4,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <div key={project.title}>
              <MotionCard
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 2,
                      fontSize: '0.9rem',
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: '0.85rem',
                      minHeight: '60px',
                    }}
                  >
                    {project.long_description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        variant="filled"
                        size="small"
                        sx={{
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(0, 212, 255, 0.15)'
                            : `rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.12)`,
                          color: theme.palette.primary.main,
                          fontSize: '0.75rem',
                          height: 'auto',
                          '& .MuiChip-label': {
                            px: 1,
                            py: 0.3,
                          },
                        }}
                      />
                    ))}
                    {project.technologies.length > 3 && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          alignSelf: 'center',
                        }}
                      >
                        +{project.technologies.length - 3} more
                      </Typography>
                    )}
                  </Stack>

                  {project.metrics && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                      {project.metrics.map((metric, idx) => (
                        <Typography
                          key={idx}
                          variant="caption"
                          sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                          }}
                        >
                          {metric}
                        </Typography>
                      ))}
                    </Stack>
                  )}
                </CardContent>

                <CardActions sx={{ gap: 1 }}>
                  {project.github && (
                    <Button
                      size="small"
                      startIcon={<GitHubIcon />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(0, 212, 255, 0.1)'
                            : `rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.08)`,
                        },
                      }}
                    >
                      Code
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      size="small"
                      endIcon={<OpenInNewIcon />}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'dark'
                            ? 'rgba(0, 212, 255, 0.1)'
                            : `rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.08)`,
                        },
                      }}
                    >
                      Live
                    </Button>
                  )}
                </CardActions>
              </MotionCard>
            </div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
