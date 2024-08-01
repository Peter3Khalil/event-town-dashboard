'use client';

import { CheckIcon, ChevronsUpDownIcon } from '@/components/shared/Icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useEvents } from '@/providers/events/events-provider';
import { EventStatus } from '@/types/event.types';

type EventStatusesType = {
  value: EventStatus;
  label: EventStatus;
};

const StatusFiltration = () => {
  const { setParams } = useEvents();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<EventStatus>('all');

  const handleSelect = useCallback(
    (currentValue: string) => {
      setValue(currentValue === value ? 'all' : (currentValue as EventStatus));
      setOpen(false);
    },
    [value],
  );

  const EVENT_STATUSES: EventStatusesType[] = useMemo(
    () => [
      {
        value: 'all',
        label: 'all',
      },
      {
        value: 'pending',
        label: 'pending',
      },
      {
        value: 'rejected',
        label: 'rejected',
      },
      {
        value: 'accepted',
        label: 'accepted',
      },
    ],
    [],
  );

  useEffect(() => {
    setParams((params) => ({
      ...params,
      eventStatus: value,
    }));
  }, [setParams, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between text-xs capitalize"
        >
          {value
            ? EVENT_STATUSES.find((STATUS) => STATUS.value === value)?.label
            : 'Select Status...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Status..." />
          <CommandList>
            <CommandEmpty>No Status found.</CommandEmpty>
            <CommandGroup>
              {EVENT_STATUSES.map((STATUS) => (
                <CommandItem
                  key={STATUS.value}
                  value={STATUS.value}
                  onSelect={handleSelect}
                  className="capitalize"
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === STATUS.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {STATUS.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StatusFiltration;
