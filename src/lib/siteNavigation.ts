export interface SiteNavigationItem {
  label: string;
  href: string;
  showInHeader: boolean;
  showInFooter: boolean;
}

export const SITE_NAV_ITEMS: SiteNavigationItem[] = [
  { label: 'About', href: '/about', showInHeader: true, showInFooter: true },
  { label: 'Skills', href: '/skills', showInHeader: true, showInFooter: false },
  { label: 'Services', href: '/services', showInHeader: true, showInFooter: true },
  { label: 'Projects', href: '/projects', showInHeader: true, showInFooter: true },
  { label: 'Experience', href: '/experience', showInHeader: true, showInFooter: false },
  { label: 'Certifications', href: '/certifications', showInHeader: true, showInFooter: false },
  { label: 'Contact', href: '/contact', showInHeader: true, showInFooter: true },
];

export const HEADER_NAV_ITEMS = SITE_NAV_ITEMS.filter((item) => item.showInHeader);
export const FOOTER_NAV_ITEMS = SITE_NAV_ITEMS.filter((item) => item.showInFooter);
