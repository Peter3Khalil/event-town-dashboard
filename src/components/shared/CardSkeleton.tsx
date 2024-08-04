import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React, { FC } from 'react';

type CardSkeletonProps = React.ComponentProps<typeof Card> & {
  number?: number;
};

const CardSkeleton: FC<CardSkeletonProps> = ({ number = 5, ...props }) => {
  return (
    <Card {...props}>
      <CardHeader>
        <Skeleton className="h-8 w-52" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {Array.from({ length: number }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
