import { EventsProvider } from '@/providers/events/events-provider';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Events',
  description: 'Events',
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <EventsProvider>{children}</EventsProvider>;
};

export default Layout;
