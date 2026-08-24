'use client';

import React from 'react';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';

import { SitePageLayout } from '@/components/SitePageLayout';

export default function ExperiencePage() {
  return (
    <SitePageLayout>
      <SkillsSection />
      <ExperienceSection />

    </SitePageLayout>
  );
}
