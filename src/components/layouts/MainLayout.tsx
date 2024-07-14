import { Page, PageLayout, PageSection } from '@/components/layouts/PageLayout';
import MobileHeader from '@/components/MobileHeader';
import CustomBreadcrumb from '@/components/shared/CustomBreadcrumb';
import { cn } from '@/lib/utils';
import { useBreadcrumb } from '@/providers/breadcrumb-provider';
import React, { FC } from 'react';

type MainLayoutProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children, className, ...props }) => {
  const { breadcrumbItems, breadcrumbPage } = useBreadcrumb();

  return (
    <main
      className={cn(
        'h-full w-full overflow-auto pb-4 sm:px-4 sm:py-4 sm:pb-2',
        className,
      )}
      {...props}
    >
      <PageLayout className="gap-2 pt-0 sm:gap-4">
        <MobileHeader />
        <Page className="h-[calc(100%-3.5rem)] px-6 sm:h-full">
          <PageSection>
            <CustomBreadcrumb
              breadcrumbItems={breadcrumbItems}
              breadcrumbPage={breadcrumbPage}
            />
          </PageSection>
          {children}
        </Page>
      </PageLayout>
    </main>
  );
};

export default MainLayout;
