import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
  Settings as ToolsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { SectionContentSkeleton } from './SkeletonLoaders';

const MotionCard = motion(Card);

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  desc: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: <CodeIcon sx={{ fontSize: '2rem' }} />,
    desc: 'Modern UI/UX with latest frameworks',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: 'Backend',
    icon: <StorageIcon sx={{ fontSize: '2rem' }} />,
    desc: 'Robust server-side solutions',
    skills: ['Node.js', 'Python', 'FastAPI', 'Django', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices'],
  },
  {
    title: 'Databases',
    icon: <CloudIcon sx={{ fontSize: '2rem' }} />,
    desc: 'Efficient data management',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'SQLite', 'Redis', 'Data Modeling'],
  },
  {
    title: 'Tools & DevOps',
    icon: <ToolsIcon sx={{ fontSize: '2rem' }} />,
    desc: 'Development & deployment tools',
    skills: ['Git', 'Docker', 'AWS', 'GitHub', 'Linux', 'CI/CD', 'Webpack', 'NPM'],
  },
];

export const SkillsSection: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    // Simulate loading delay for demo; in production, replace with actual fetch
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    return (
      <Box component="section" id="skills" sx={{ py: 12 }}>
        <SectionContentSkeleton lines={8} />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: 12,
        background: `linear-gradient(135deg, 
          ${theme.palette.background.default} 0%,
          rgba(30, 136, 229, 0.03) 100%)`,
        position: 'relative',
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
            Professional Expertise
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
            Skills & Technologies
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
            A comprehensive skill set built through hands-on experience and continuous learning in modern web development.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' },
            gap: 3,
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillCategories.map((category) => (
            <div key={category.title}>
              <MotionCard
                variants={itemVariants}
                whileHover={{ y: -8 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: `rgba(${theme.palette.primary.main === '#7C3AED' ? '124, 58, 237' : '0, 212, 255'}, 0.1)`,
                    }}
                  >
                    {category.icon}
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {category.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                      minHeight: '40px',
                    }}
                  >
                    {category.desc}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {category.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontSize: '0.85rem',
                          height: 'auto',
                          '& .MuiChip-label': {
                            px: 1.5,
                            py: 0.5,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </MotionCard>
            </div>
          ))}
        </Box>

        {/* Proficiency Overview */}
        <Box sx={{ mt: 12 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: theme.palette.text.primary,
              textAlign: 'center',
            }}
          >
            Technical Proficiency
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 4,
            }}
          >
            {[
              { label: 'Frontend Development', level: 95, color: theme.palette.primary.main },
              { label: 'Backend Development', level: 90, color: theme.palette.secondary.main },
              { label: 'Database Design', level: 85, color: theme.palette.success.main },
              { label: 'DevOps & Deployment', level: 80, color: theme.palette.warning.main },
            ].map((item, idx) => (
              <div key={item.label}>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: item.color, fontWeight: 700 }}>
                      {item.level}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: '8px',
                      borderRadius: '4px',
                      background: `rgba(${theme.palette.text.primary === '#FFFFFF' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}99)`,
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
