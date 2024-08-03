'use client';
import { COLUMNS } from '@/providers/categories/COLUMNS';
import { Category } from '@/types/categories.types';
import {
  getCoreRowModel,
  PaginationState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';

type ContextType<TData> = {
  table: Table<TData>;
};
const CategoriesTableContext = createContext<ContextType<Category>>({
  table: {} as Table<Category>,
});

const CategoriesTableProvider = ({
  children,
  categories = [],
  totalRowCount = 0,
  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
}: {
  children: React.ReactNode;
  categories: Category[];
  totalRowCount?: number;
  pagination?: PaginationState;
}) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: categories,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination,
      columnVisibility,
    },
    rowCount: totalRowCount,
  });

  return (
    <CategoriesTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </CategoriesTableContext.Provider>
  );
};

const useCategoriesTable = () => {
  const context = useContext(CategoriesTableContext);

  if (context === undefined) {
    throw new Error(
      'useCategoriesTable must be used within a CategoriesTableProvider',
    );
  }

  return context;
};

export { CategoriesTableProvider, useCategoriesTable };
