'use client';
import { Page, PageLayout, PageSection } from '@/components/layouts/PageLayout';
import PrivateRoute from '@/components/PrivateRoute';
import CustomBreadcrumb from '@/components/shared/CustomBreadcrumb';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/providers/auth-provider';
import {
  BreadcrumbProvider,
  useBreadcrumb,
} from '@/providers/breadcrumb-provider';
import React from 'react';

const BreadcrumbWrapper = () => {
  const { breadcrumbItems, breadcrumbPage } = useBreadcrumb();

  return (
    <CustomBreadcrumb
      breadcrumbItems={breadcrumbItems}
      breadcrumbPage={breadcrumbPage}
    />
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <BreadcrumbProvider>
        <PrivateRoute>
          <div className="flex h-svh w-full">
            <Sidebar className="shrink-0" />
            <main className="h-full w-full overflow-auto px-6 py-4 sm:px-8">
              <PageLayout>
                <Page>
                  <PageSection>
                    <BreadcrumbWrapper />
                  </PageSection>
                  {children}
                </Page>
              </PageLayout>
            </main>
          </div>
        </PrivateRoute>
      </BreadcrumbProvider>
    </AuthProvider>
  );
};

export default Layout;