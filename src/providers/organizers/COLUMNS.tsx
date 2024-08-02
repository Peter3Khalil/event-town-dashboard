import CellAction from '@/components/shared/CellAction';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import OrganizersApi from '@/services/OrganizersApi';
import { Organizer } from '@/types/organizer.types';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<Organizer>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableHiding: false,
  },
  {
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
  },
  {
    id: 'organizer',
    accessorKey: 'organizerName',
    header: 'Organizer Name',
    cell: ({ row }) => row.original.organizerName,
  },
  {
    id: 'organization',
    accessorKey: 'organizationName',
    header: 'Organization',
    cell: ({ row }) => row.original.organizationName,
  },
  {
    id: 'Email',
    accessorKey: 'organizationEmail',
    header: 'Email',
    cell: ({ row }) => row.original.organizationEmail,
  },
  {
    id: 'phone',
    accessorKey: 'organizationPhoneNumber',
    header: 'Phone',
    cell: ({ row }) => row.original.organizationPhoneNumber,
  },
  {
    id: 'Field',
    accessorKey: 'organizationField',
    header: 'Field',
    cell: ({ row }) => row.original.organizationField,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        deleteFunction={OrganizersApi.delete}
        invalidateKey="organizers"
        updateHref={`/organizers/update/${row.original._id}`}
        model={row.original}
      />
    ),
    enableHiding: false,
  },
];