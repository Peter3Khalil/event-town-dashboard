'use client';
import createTableContext from '@/providers/table-provider';
import { Category } from '@/types/categories.types';
import DeleteCategoryAlert from '@/components/category/DeleteCategoryAlert';
import EditCategoryDialog from '@/components/category/EditCategoryDialog';
import { Capitalize, formatDateTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

const {
  TableProvider: CategoriesTableProvider,
  useTableContext: useCategoriesTable,
} = createTableContext<Category>();

const COLUMNS: ColumnDef<Category>[] = [
  {
    id: 'ID',
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => Capitalize(row.original.title),
  },
  {
    id: 'Created At',
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    id: 'Updated At',
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => formatDateTime(row.original.updatedAt),
  },
  {
    id: 'Actions',
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center">
        <EditCategoryDialog category={row.original} />
        <DeleteCategoryAlert category={row.original} />
      </div>
    ),
  },
];

export { CategoriesTableProvider, useCategoriesTable, COLUMNS };
