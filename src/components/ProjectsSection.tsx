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
    title: 'Record Management Application',
    description: 'A comprehensive CS50 final project',
    long_description: 'Built a full-stack record management system with user authentication, CRUD operations, and advanced search functionality. Implemented with Flask backend and modern frontend technologies.',
    technologies: ['Flask', 'Python', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/rafi-2024/record_management_app',
    metrics: ['100+ Records', 'Advanced Search', 'Secure Auth'],
  },
  {
    title: 'Full Stack E-Commerce Platform',
    description: 'Scalable online marketplace',
    long_description: 'Developed a complete e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Implemented real-time notifications and inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    github: 'https://github.com',
    metrics: ['500+ Products', 'Payment Integration', 'Analytics'],
  },
  {
    title: 'Real-time Chat Application',
    description: 'Web-based communication platform',
    long_description: 'Built a real-time messaging application with user presence, typing indicators, file sharing, and emoji support. Utilized WebSockets for instant communication.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    live: 'https://example.com',
    github: 'https://github.com',
    metrics: ['Real-time Sync', 'File Sharing', 'Analytics'],
  },
  {
    title: 'Task Management Dashboard',
    description: 'Collaborative project management tool',
    long_description: 'Created an intuitive task management system with drag-and-drop functionality, team collaboration features, and progress tracking. Integrated with popular productivity tools.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    live: 'https://example.com',
    metrics: ['Team Collab', 'Drag & Drop', 'Real-time Updates'],
  },
  {
    title: 'API Analytics Dashboard',
    description: 'Performance monitoring platform',
    long_description: 'Developed a comprehensive API monitoring and analytics dashboard with real-time data visualization, performance metrics, and alert systems.',
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'Chart.js', 'AWS'],
    metrics: ['Real-time Metrics', '99.9% Uptime', 'Custom Alerts'],
  },
  {
    title: 'Mobile App Backend',
    description: 'Scalable microservices architecture',
    long_description: 'Architected and implemented a robust backend infrastructure using microservices pattern, supporting millions of API calls daily with high availability.',
    technologies: ['Node.js', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    github: 'https://github.com',
    metrics: ['Microservices', '1M+ Requests/day', 'Auto-scaling'],
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
