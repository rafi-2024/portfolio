'use client';

import React, { useState }  from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageFolder: string;
  imageCount: number;
  github?: string;
  metrics?: string[];
}

interface ProjectCardProps {
  project: Project;
  isFlipped: boolean;
  onFlip: () => void;
}

const projects: Project[] = [
  {
    id: 'pension-system',
    title: 'Pension Management System',
    description: 'Built an MS-Access-based system automating pension eligibility, calculation, case processing and audit reporting for large employee datasets as per Federal Government requirements.',
    technologies: ['MS-Access', 'VBA', 'Database Design'],
    imageFolder: '/projects/pension-system',
    imageCount: 4,
    github: 'https://github.com/rafi-2024',
    metrics: ['99.8% Accuracy', '90% Time Reduction'],
  },
  {
    id: 'record-management',
    title: 'Record Management Web App',
    description: 'Built a full-stack Flask application with authentication, CRUD operations, and form validation for managing organizational records.',
    technologies: ['Flask', 'Python', 'SQLite', 'HTML5'],
    imageFolder: '/projects/record-management',
    imageCount: 4,
    github: 'https://github.com/rafi-2024/record_management_app',
    metrics: ['CS50 Project', '45% Efficiency Gain'],
  },
  {
    id: 'billing-accounting',
    title: 'Billing & Accounting System',
    description: 'Built a full-stack billing and accounting platform using Django REST, React, and PostgreSQL.',
    technologies: ['Django', 'React', 'PostgreSQL', 'REST APIs'],
    imageFolder: '/projects/billing-accounting',
    imageCount: 4,
    github: 'https://github.com/rafi-2024/CBC-New',
    metrics: ['90% Automation', 'Production Ready'],
  },
  {
    id: 'payroll-parser',
    title: 'Payroll PDF Parser System',
    description: 'Developed a full-stack payroll PDF parsing system using Django REST Framework and React with async processing.',
    technologies: ['Django', 'React', 'PostgreSQL', 'Celery', 'Redis'],
    imageFolder: '/projects/payroll-parser',
    imageCount: 4,
    github: 'https://github.com/rafi-2024/payroll-New',
    metrics: ['70% Time Reduction', 'Async Processing'],
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isFlipped, onFlip }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.imageCount);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.imageCount) % project.imageCount);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: '1000px', height: '100%' }}
    >
      <motion.div
        onClick={onFlip}
        style={{
          perspective: '1000px',
          height: '100%',
          cursor: 'pointer',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.8)',
                  border: `1px solid ${theme.palette.divider}`,
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden',
                  transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.text.primary,
                      fontSize: isMobile ? '1.1rem' : '1.3rem',
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 2.5,
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      TECH STACK
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.secondary.main}40)`,
                            color: theme.palette.text.primary,
                            border: `1px solid ${theme.palette.primary.main}`,
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {project.metrics && (
                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 600,
                          mb: 1,
                          display: 'block',
                        }}
                      >
                        METRICS
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {project.metrics.map((metric) => (
                          <Chip
                            key={metric}
                            label={metric}
                            size="small"
                            variant="outlined"
                            sx={{
                              color: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main,
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    {project.github && (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GitHubIcon />}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          flex: 1,
                          '&:hover': {
                            background: theme.palette.primary.main,
                            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                          },
                        }}
                      >
                        GitHub
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<LaunchIcon />}
                      sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        flex: 1,
                        '&:hover': {
                          opacity: 0.9,
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onFlip();
                      }}
                    >
                      View Images
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: isMobile ? '300px' : '400px',
                  background: theme.palette.background.paper,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={`${project.imageFolder}/${currentImageIndex + 1}.jpg`}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  width={600}
                  height={isMobile ? 300 : 400}
                  priority
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                    pointerEvents: 'none',
                  }}
                />

                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    zIndex: 10,
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: '#fff',
                    zIndex: 10,
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 10,
                  }}
                >
                  {Array.from({ length: project.imageCount }).map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={(e: React.MouseEvent) => handleDotClick(idx, e)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        background: idx === currentImageIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>

                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    zIndex: 10,
                  }}
                >
                  {currentImageIndex + 1} / {project.imageCount}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: `linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)`,
                    p: 2,
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="caption">Click to flip back</Typography>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (projectId: string) => {
    setFlipped((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: 12,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, rgba(30, 136, 229, 0.03) 100%)`
          : `linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(248, 245, 255) 100%)`,
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
            Portfolio
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
            Click on any project to explore the image gallery
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFlipped={flipped[project.id] || false}
              onFlip={() => toggleFlip(project.id)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
