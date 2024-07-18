import { Checkbox } from '@/components/ui/checkbox';
import { Row } from '@tanstack/react-table';
import React from 'react';

interface SelectRowCheckboxProps<TData>
  extends React.ComponentProps<typeof Checkbox> {
  row: Row<TData>;
}

const SelectRowCheckbox = <TData,>({
  row,
  ...props
}: SelectRowCheckboxProps<TData>) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      {...props}
    />
  );
};

export default SelectRowCheckbox;
