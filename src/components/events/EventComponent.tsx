import MyImage from '@/components/shared/MyImage';
import RecordComponent from '@/components/shared/RecordComponent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event.types';
import Link from 'next/link';
import React, { FC } from 'react';

interface EventComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

const EventComponent: FC<EventComponentProps> = ({
  event,
  className,
  ...props
}) => {
  const image = event.eventImage ?? 'https://picsum.photos/50/50';
  return (
    <div className={cn('flex w-full items-center gap-3', className)} {...props}>
      <MyImage src={image} alt={event.eventName} width={50} height={50} />
      <div className="flex flex-col overflow-hidden text-ellipsis text-xs">
        <Button
          variant={'link'}
          className="size-auto items-start justify-start p-0"
        >
          <span className="overflow-hidden text-ellipsis font-semibold">
            <Link href={`/events/${event._id}`}>{event.eventName}</Link>
          </span>
        </Button>
        <RecordComponent
          label="organization name"
          value={event.organizationName}
        />
        <RecordComponent label="location" value={event.eventAddress} />
        <RecordComponent label="Description" value={event.eventDescription} />
      </div>
    </div>
  );
};

export default EventComponent;
