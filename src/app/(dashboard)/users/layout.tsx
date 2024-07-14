import { UsersProvider } from '@/providers/users/users-provider';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Users',
  description: 'Users',
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UsersProvider>{children}</UsersProvider>;
};

export default Layout;
