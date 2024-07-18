'use client';
import React, { FC } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
interface MyTooltipProps
  extends React.ComponentProps<typeof TooltipProvider>,
    Omit<React.ComponentProps<typeof TooltipContent>, 'content'> {
  children: React.ReactNode;
  content: React.ReactNode;
}

const MyTooltip: FC<MyTooltipProps> = ({
  children,
  delayDuration = 300,
  disableHoverableContent,
  skipDelayDuration,
  content,
  asChild = false,
  ...props
}) => {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent side="right" {...props}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MyTooltip;
