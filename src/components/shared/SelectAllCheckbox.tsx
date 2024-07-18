import { Checkbox } from '@/components/ui/checkbox';
import { Table } from '@tanstack/react-table';
import React from 'react';

interface SelectAllCheckboxProps<TData>
  extends React.ComponentProps<typeof Checkbox> {
  table: Table<TData>;
}

const SelectAllCheckbox = <TData,>({
  table,
}: SelectAllCheckboxProps<TData>) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};

export default SelectAllCheckbox;
