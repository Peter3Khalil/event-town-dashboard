import { CancelIcon, RefreshIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
interface UseRefetchProps {
  isFetching: boolean;
  isLoading: boolean;
  isFetched: boolean;
  isCancelled: boolean;
  refresh: () => void;
  cancelQuery: () => void;
}

const useRefetch = ({
  isFetching,
  isLoading,
  isFetched,
  isCancelled,
  refresh,
  cancelQuery,
}: UseRefetchProps) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [requestState, setRequestState] = useState<'requesting' | 'idle'>(
    'idle',
  );
  const isRefetchingDone = useMemo(
    () => isFetched && !isFetching,
    [isFetched, isFetching],
  );

  const isRequesting = useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  const RequestActionsButtons = useMemo(() => {
    return {
      idle: (
        <>
          <MyTooltip content="Refresh" asChild>
            <Button
              variant={'secondary'}
              size={'icon'}
              className="aspect-square size-auto rounded-full p-1"
              onClick={() => refresh()}
            >
              <RefreshIcon size={16} />
            </Button>
          </MyTooltip>
          <p
            className={cn('text-xs text-muted-foreground', {
              hidden: !isRefetchingDone,
            })}
          >
            <strong className="mr-[1px] font-medium">Last updated:</strong>
            <span className="mx-1">{lastUpdated?.toLocaleTimeString()}</span>
          </p>
        </>
      ),
      requesting: (
        <MyTooltip content="Cancel" asChild>
          <Button
            variant={'secondary'}
            size={'icon'}
            className="aspect-square size-auto rounded-full p-1"
            onClick={cancelQuery}
          >
            <CancelIcon size={16} />
          </Button>
        </MyTooltip>
      ),
    };
  }, [cancelQuery, isRefetchingDone, lastUpdated, refresh]);

  useEffect(() => {
    if (isRequesting) {
      setRequestState('requesting');
    } else {
      setRequestState('idle');
    }
  }, [isRequesting]);

  useEffect(() => {
    if (isRefetchingDone && !isCancelled) {
      setLastUpdated(new Date());
    }
  }, [isCancelled, isRefetchingDone]);

  return {
    RequestActionsButtons,
    requestState,
  };
};

export default useRefetch;
