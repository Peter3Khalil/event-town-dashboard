import FormLayout from '@/components/layouts/FormLayout';
import { Skeleton } from '@/components/ui/skeleton';
import React, { FC } from 'react';

type FormSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  count?: number;
};

const FormSkeleton: FC<FormSkeletonProps> = ({
  count = 6,
  children,
  ...props
}) => {
  return (
    <div {...props}>
      {children}
      <FormLayout>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="mb-4 h-12 w-full" />
        ))}
      </FormLayout>
    </div>
  );
};

export default FormSkeleton;
