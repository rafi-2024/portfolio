'use client';

import React from 'react';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';
import { SitePageLayout } from '@/components/SitePageLayout';

export default function ServicesPage() {

  return (
    <SitePageLayout mainTopSpacing={4}>
        <ServicesSection />
        <ContactSection />
    </SitePageLayout>
  );
}
