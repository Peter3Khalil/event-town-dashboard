import EventsApi from '@/app/(pages)/(dashboard)/events/services/EventsApi';
import { Event } from '@/app/(pages)/(dashboard)/events/types/event.types';
import { CheckIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import React, { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
interface AcceptButtonProps extends React.ComponentProps<typeof Button> {
  event: Event;
}
const AcceptButton: FC<AcceptButtonProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(EventsApi.accept, {
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
  const handleAccept = useCallback(() => {
    mutate(event._id);
  }, [event._id, mutate]);

  return (
    <MyTooltip content="Accept" className="text-xs">
      <Button
        variant={'secondary'}
        onClick={handleAccept}
        disabled={isLoading}
        className="h-auto p-1"
        {...props}
      >
        <CheckIcon size={16} />
      </Button>
    </MyTooltip>
  );
};

export default AcceptButton;
