import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  Work as WorkIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { GridItemsSkeleton } from './SkeletonLoaders';

const MotionCard = motion(Card);

interface Experience {
  title: string;
  company?: string;
  school?: string;
  period: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
  skills?: string[];
}

const experiences: Experience[] = [
  {
    type: 'achievement',
    title: 'CS50 Course Completion',
    school: 'Harvard University',
    period: '2024',
    description: 'Completed the prestigious CS50 Introduction to Computer Science course online. Submitted comprehensive final project on record management system.',
    skills: ['Problem Solving', 'Full Stack Development', 'C', 'Python', 'JavaScript', 'SQL'],
  },
  {
    type: 'work',
    title: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: '2020 - Present',
    description: 'Developing and maintaining web applications for various clients. Building scalable solutions using React, Node.js, and cloud platforms. Managing project lifecycle from requirements to deployment.',
    skills: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Project Management'],
  },
  {
    type: 'work',
    title: 'Junior Developer (2 Professional Projects)',
    company: 'Various Organizations',
    period: '2019 - 2023',
    description: 'Worked on commercial projects including web applications and system integrations. Collaborated with teams to deliver high-quality software solutions on schedule.',
    skills: ['React', 'TypeScript', 'REST APIs', 'Database Design', 'Team Collaboration'],
  },
  {
    type: 'education',
    title: 'Self-Directed Learning Journey',
    school: 'Online Platforms & Practice',
    period: '2017 - Present',
    description: 'Started learning programming with Python in 2017. Progressed through Web Development, building projects and continuously expanding technical expertise across full stack development.',
    skills: ['Python', 'Web Development', 'Continuous Learning', 'Problem Solving'],
  },
];

export const ExperienceSection: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    // Simulate loading delay for demo; in production, replace with actual fetch
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <WorkIcon />;
      case 'education':
        return <SchoolIcon />;
      case 'achievement':
        return <TrophyIcon />;
      default:
        return <WorkIcon />;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <Box component="section" id="experience" sx={{ py: 12 }}>
        <GridItemsSkeleton count={4} columns={{ xs: 1, md: 2 }} />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="experience"
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
            Professional Journey
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
            Experience & Education
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
            A timeline of my professional growth, education, and key achievements in software development.
          </Typography>
        </Box>

        <Timeline
          position={isMobile ? 'right' : 'alternate'}
          sx={{
            '& .MuiTimelineItem-root:before': {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              {!isMobile && (
                <TimelineOppositeContent
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.9rem',
                    py: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    {exp.period}
                  </Typography>
                </TimelineOppositeContent>
              )}

              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    background: exp.type === 'achievement'
                      ? 'linear-gradient(135deg, #FF9800 0%, #F44336 100%)'
                      : exp.type === 'education'
                        ? 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)'
                        : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    width: 45,
                    height: 45,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#FFFFFF',
                  }}
                >
                  {getIcon(exp.type)}
                </TimelineDot>
                {index < experiences.length - 1 && (
                  <TimelineConnector
                    sx={{
                      bgcolor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 212, 255, 0.2)'
                        : 'rgba(124, 58, 237, 0.2)',
                    }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent sx={{ py: 2, px: 2 }}>
                <MotionCard
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  sx={{
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, rgba(26, 40, 71, 0.9) 0%, rgba(15, 23, 41, 0.9) 100%)`
                      : `linear-gradient(135deg, rgba(245, 240, 255, 0.9) 0%, rgba(237, 233, 254, 0.9) 100%)`,
                    border: `2px solid ${
                      exp.type === 'achievement'
                        ? 'rgba(255, 152, 0, 0.3)'
                        : exp.type === 'education'
                          ? 'rgba(76, 175, 80, 0.3)'
                          : theme.palette.mode === 'dark'
                            ? 'rgba(0, 212, 255, 0.3)'
                            : 'rgba(124, 58, 237, 0.3)'
                    }`,
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          mb: 0.5,
                        }}
                      >
                        {exp.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      >
                        {exp.company || exp.school}
                      </Typography>
                    </Box>

                    {isMobile && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.text.secondary,
                          display: 'block',
                          mb: 1,
                        }}
                      >
                        {exp.period}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        lineHeight: 1.6,
                      }}
                    >
                      {exp.description}
                    </Typography>

                    {exp.skills && (
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {exp.skills.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              fontSize: '0.8rem',
                              height: 'auto',
                              '& .MuiChip-label': {
                                px: 1,
                                py: 0.3,
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </CardContent>
                </MotionCard>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};
