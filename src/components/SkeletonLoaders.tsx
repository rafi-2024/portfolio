'use client';

import React from 'react';
import {
  Box,
  Card,
  Skeleton,
  Container,
  useTheme,
} from '@mui/material';

/**
 * Skeleton loader for service/package cards grid
 * Shows 3 card placeholders with feature lines
 */
export const ServiceCardsSkeleton: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '700px',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        {/* Header skeleton */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Skeleton variant="text" width={180} height={36} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width={420} height={56} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" width={620} height={30} sx={{ mx: 'auto' }} />
        </Box>

        {/* Cards grid skeleton */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} sx={{ p: 4, borderRadius: '16px' }}>
              {/* Icon skeleton */}
              <Skeleton variant="rounded" width={80} height={80} sx={{ mb: 3, borderRadius: '16px' }} />

              {/* Title skeleton */}
              <Skeleton variant="text" width="65%" height={42} sx={{ mb: 1 }} />

              {/* Description skeleton */}
              <Skeleton variant="text" width="100%" height={26} />
              <Skeleton variant="text" width="92%" height={26} sx={{ mb: 2 }} />

              {/* Price skeleton */}
              <Skeleton variant="text" width={120} height={48} sx={{ mb: 2 }} />

              {/* Feature lines skeleton */}
              {Array.from({ length: 5 }).map((__, featureIdx) => (
                <Skeleton key={featureIdx} variant="text" width="100%" height={24} />
              ))}

              {/* Button skeleton */}
              <Skeleton variant="rounded" width="100%" height={46} sx={{ mt: 2, borderRadius: '8px' }} />
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

/**
 * Skeleton loader for section content
 * Shows a heading and a few lines of text
 */
export const SectionContentSkeleton: React.FC<{ lines?: number }> = ({ lines = 4 }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Section heading */}
      <Skeleton variant="text" width={200} height={48} sx={{ mb: 2 }} />

      {/* Content lines */}
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="text"
          width={idx === lines - 1 ? '80%' : '100%'}
          height={24}
          sx={{ mb: 1 }}
        />
      ))}
    </Container>
  );
};

/**
 * Skeleton loader for a grid of items (projects, experience, etc.)
 */
export const GridItemsSkeleton: React.FC<{ count?: number; columns?: { xs: number; md: number } }> = ({
  count = 6,
  columns = { xs: 1, md: 3 },
}) => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: `repeat(${columns.xs}, 1fr)`, md: `repeat(${columns.md}, 1fr)` },
          gap: 3,
        }}
      >
        {Array.from({ length: count }).map((_, idx) => (
          <Card
            key={idx}
            sx={{
              p: 3,
              borderRadius: '12px',
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 40, 71, 0.5)' : 'rgba(237, 233, 254, 0.5)',
            }}
          >
            <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="95%" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width={100} height={32} />
          </Card>
        ))}
      </Box>
    </Container>
  );
};
