import { CategoriesProvider } from '@/providers/categories/categories-provider';
import { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: 'Categories',
  description: 'Categories',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CategoriesProvider>{children}</CategoriesProvider>;
};

export default Layout;
