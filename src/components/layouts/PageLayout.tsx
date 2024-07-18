import { cn } from '@/lib/utils';
import React, { FC } from 'react';

export const PageLayout: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex h-full w-full flex-col gap-4 sm:pt-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const Page: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex h-full w-full flex-col gap-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const PageHeader: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        'flex items-start justify-between sm:items-center',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export const PageSection: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className={cn('w-full', className)} {...props}>
      {children}
    </section>
  );
};

export const PageContent: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={cn(
        'flex w-full flex-1 flex-col gap-3 overflow-auto',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export const PageTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={cn('text-2xl font-bold', className)} {...props}>
      {children}
    </h1>
  );
};

export const PageDescription: FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, ...props }) => {
  return (
    <p className={cn('text-xs text-muted-foreground', className)} {...props}>
      {children}
    </p>
  );
};
