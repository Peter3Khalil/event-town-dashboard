import AcceptButton from '@/components/events/AcceptButton';
import EventComponent from '@/components/events/EventComponent';
import PriceSorting from '@/components/events/PriceSorting';
import RejectButton from '@/components/events/RejectButton';
import StatusFiltration from '@/components/events/StatusFiltration';
import CellAction from '@/components/shared/CellAction';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import EventsApi from '@/services/EventsApi';
import type { EventStatusWithOutAll, Event } from '@/types/event.types';
import { ColumnDef } from '@tanstack/react-table';

type EventStatusesComponentType = Record<
  EventStatusWithOutAll,
  { component: JSX.Element }
>;

export const EVENT_STATUSES_COMPONENTS: EventStatusesComponentType = {
  rejected: {
    component: (
      <Badge className="capitalize" variant={'destructive'}>
        <p className="text-[12px] font-normal">rejected</p>
      </Badge>
    ),
  },
  pending: {
    component: (
      <Badge className="capitalize" variant={'outline'}>
        <p className="text-[12px] font-normal">Pending</p>
      </Badge>
    ),
  },
  accepted: {
    component: (
      <Badge className="text-xs capitalize opacity-40" variant={'secondary'}>
        <p className="text-[12px] font-normal">accepted</p>
      </Badge>
    ),
  },
};

export const COLUMNS: ColumnDef<Event>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableHiding: false,
  },
  {
    id: 'ID',
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
  },
  {
    id: 'Name',
    accessorKey: 'eventName',
    header: 'Name',
    cell: ({ row }) => <EventComponent event={row.original} />,
  },
  {
    id: 'Date',
    accessorKey: 'eventDate',
    header: 'Date',
    cell: ({ getValue }) => formatDateTime(getValue() as string),
  },
  {
    id: 'Price',
    accessorKey: 'eventPrice',
    header: () => <PriceSorting />,
    cell: ({
      row: {
        original: { eventPrice },
      },
    }) => (
      <p>
        <span className="font-semibold">{eventPrice}</span>
        <span className="ml-1 text-[0.8em] italic">EGP</span>
      </p>
    ),
  },
  {
    id: 'Status',
    accessorKey: 'eventStatus',
    header: () => <StatusFiltration />,
    cell: ({ getValue }) => {
      const status: EventStatusWithOutAll = getValue() as EventStatusWithOutAll;
      return EVENT_STATUSES_COMPONENTS[status].component;
    },
  },
  {
    id: 'Actions',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs">
        {row.original.eventStatus === 'pending' && (
          <>
            <AcceptButton event={row.original} />
            <RejectButton event={row.original} />
          </>
        )}
        {row.original.eventStatus === 'accepted' && (
          <RejectButton event={row.original} />
        )}
        {row.original.eventStatus === 'rejected' && (
          <AcceptButton event={row.original} />
        )}
      </div>
    ),
  },
  {
    id: 'mutate',
    cell: ({ row }) => (
      <CellAction
        deleteFunction={EventsApi.delete}
        invalidateKey="events"
        updateHref={`/events/${row.original._id}`}
        model={row.original}
      />
    ),
    enableHiding: false,
  },
];
