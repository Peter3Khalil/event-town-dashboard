import { cn } from '@/lib/utils';
import React from 'react';

interface RecordProps extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
  value: string | number;
}
const RecordComponent = ({
  label,
  value,
  className,
  ...props
}: RecordProps) => (
  <p
    className={cn(
      'w-full overflow-hidden text-ellipsis text-[0.9em] text-muted-foreground',
      className,
    )}
    title={value?.toString()}
    {...props}
  >
    <span className="mr-1 capitalize">{label}: </span>
    <span className="font-medium">{value}</span>
  </p>
);

export default RecordComponent;
