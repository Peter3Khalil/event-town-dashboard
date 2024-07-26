import EditCategoryDialog from '@/components/category/EditCategoryDialog';
import DeleteButton from '@/components/shared/DeleteButton';
import { TrashIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Capitalize, formatDateTime } from '@/lib/utils';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<Category>[] = [
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
        <AlertDialog>
          <AlertDialogTrigger>
            <MyTooltip content="Delete" side="top" delayDuration={500}>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="text-destructive hover:text-destructive"
              >
                <TrashIcon className="size-5" />
              </Button>
            </MyTooltip>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-transparent p-0 hover:bg-transparent">
                <DeleteButton
                  deleteFunction={CategoriesApi.delete}
                  model={row.original}
                  invalidateKey="categories"
                  className="w-full"
                >
                  Delete
                </DeleteButton>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];
