'use client';
import MainLayout from '@/components/layouts/MainLayout';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/providers/auth-provider';
import { BreadcrumbProvider } from '@/providers/breadcrumb-provider';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BreadcrumbProvider>
        <PrivateRoute>
          <div className="flex h-svh w-full">
            <Sidebar className="shrink-0" />
            <MainLayout>{children}</MainLayout>
          </div>
        </PrivateRoute>
      </BreadcrumbProvider>
    </AuthProvider>
  );
};

export default Layout;
