/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
} from '@/components/shared/CustomDialog';
import DeleteButton from '@/components/shared/DeleteButton';
import {
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Link from 'next/link';
import { useState } from 'react';

interface CellActionProps<TData extends { _id: string }>
  extends React.ComponentProps<typeof DropdownMenuContent> {
  model: TData;
  deleteFunction: (
    id: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<any, any>>;
  invalidateKey?: string;
  updateHref: string;
}

const CellAction = <TData extends { _id: string }>({
  model,
  deleteFunction,
  updateHref,
  invalidateKey,
  ...props
}: CellActionProps<TData>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" {...props}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Button variant={'ghost'} className="size-auto p-1 text-xs" asChild>
              <Link href={updateHref}>
                <EditIcon className="mr-2 size-4 shrink-0" /> Update
              </Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant={'ghost'}
              onClick={() => setOpen(true)}
              className="size-auto p-1 text-xs text-destructive hover:text-destructive"
              asChild
            >
              <div className="flex items-center">
                <TrashIcon className="mr-2 size-4 shrink-0" /> Delete
              </div>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomDialog open={open} onOpenChange={setOpen}>
        <CustomDialogContent>
          <CustomDialogHeader>
            <CustomDialogTitle>
              Are you sure you want to delete this organizer?
            </CustomDialogTitle>
            <CustomDialogDescription>
              This action cannot be undone.
            </CustomDialogDescription>
          </CustomDialogHeader>
          <CustomDialogFooter>
            <Button variant={'secondary'} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <DeleteButton
              variant={'destructive'}
              deleteFunction={deleteFunction}
              model={model}
              onSuccess={() => {
                setOpen(false);
              }}
              invalidateKey={invalidateKey}
            >
              Delete
            </DeleteButton>
          </CustomDialogFooter>
        </CustomDialogContent>
      </CustomDialog>
    </>
  );
};

export default CellAction;
