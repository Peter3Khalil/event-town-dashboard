import FormLayout from '@/components/layouts/FormLayout';
import { Skeleton } from '@/components/ui/skeleton';
import React, { FC } from 'react';

type FormSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  count?: number;
};

const FormSkeleton: FC<FormSkeletonProps> = ({ count = 6, ...props }) => {
  return (
    <div {...props}>
      <Skeleton className="mx-auto mb-8 flex h-[200px] w-full rounded-md md:w-[80%] lg:w-[50%]" />
      <FormLayout>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="mb-4 h-12 w-full" />
        ))}
      </FormLayout>
    </div>
  );
};

export default FormSkeleton;
