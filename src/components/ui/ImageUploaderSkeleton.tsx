import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

type ImageUploaderSkeletonProps = React.ComponentProps<typeof Skeleton>;

const ImageUploaderSkeleton: FC<ImageUploaderSkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <Skeleton
      className={cn(
        'mx-auto mb-8 flex h-[200px] w-full rounded-md md:w-[80%] lg:w-[50%]',
        className,
      )}
      {...props}
    />
  );
};

export default ImageUploaderSkeleton;
