import { CategoriesProvider } from '@/providers/categories/categories-provider';
import { UsersProvider } from '@/providers/users/users-provider';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Users',
  description: 'Users',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CategoriesProvider>
      <UsersProvider>{children}</UsersProvider>
    </CategoriesProvider>
  );
};

export default Layout;
