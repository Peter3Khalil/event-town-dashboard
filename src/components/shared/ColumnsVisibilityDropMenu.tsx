'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Table } from '@tanstack/react-table';
import { ChevronDown, MoreHorizontalIcon } from 'lucide-react';
import React from 'react';
interface ColumnsVisibilityDropMenuProps<TData>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  table: Table<TData>;
}

const ColumnsVisibilityDropMenu = <TData,>({
  table,
  ...props
}: ColumnsVisibilityDropMenuProps<TData>) => {
  const { isMatched: isMobile } = useMediaQuery({ maxWidth: 640 });

  return (
    <DropdownMenu>
      {isMobile ? (
        <DropdownMenuTrigger asChild {...props}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="size-4 rotate-90" />
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger asChild {...props}>
          <Button variant="outline">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnsVisibilityDropMenu;
