import { CheckIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import EventsApi from '@/features/EventsApi';
import { Event } from '@/types/event.types';
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
    <Button
      variant={'secondary'}
      onClick={handleAccept}
      disabled={isLoading}
      className="h-auto p-1"
      {...props}
    >
      <CheckIcon size={16} />
    </Button>
  );
};

export default AcceptButton;
