import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { APP_FONT, BRAND_COLOR } from '@/constants';
import MyQueryClientProvider from '@/providers/query-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin Dashboard',
  },
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-svh antialiased ${APP_FONT.className} w-full bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MyQueryClientProvider>
            <NextTopLoader showSpinner={false} color={BRAND_COLOR} />
            {children}
            <Toaster />
          </MyQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
