'use client';

import React from 'react';
import { ServicesSection } from '@/components/ServicesSection';
import { SitePageLayout } from '@/components/SitePageLayout';

export default function ServicesPage() {

  return (
    <SitePageLayout mainTopSpacing={4}>
        <ServicesSection />
    </SitePageLayout>
  );
}
