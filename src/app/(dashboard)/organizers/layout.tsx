import { OrganizersProvider } from '@/providers/organizers/organizers-provider';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Organizers',
  description: 'Organizers',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <OrganizersProvider>{children}</OrganizersProvider>;
};

export default Layout;
