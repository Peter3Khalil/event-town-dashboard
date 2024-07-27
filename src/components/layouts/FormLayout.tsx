import { cn } from '@/lib/utils';
import React, { FC } from 'react';

type FormLayoutProps = React.HTMLAttributes<HTMLDivElement>;

const FormLayout: FC<FormLayoutProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-start gap-4 gap-y-6 pb-12 md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default FormLayout;
