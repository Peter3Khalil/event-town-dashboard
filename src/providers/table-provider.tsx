'use client';
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState, ReactNode } from 'react';

type ContextType<TData> = {
  table: Table<TData>;
};

const createTableContext = <TData,>() => {
  const TableContext = createContext<ContextType<TData>>({
    table: {} as Table<TData>,
  });

  const TableProvider = ({
    children,
    data = [],
    columns = [],
    totalRowCount = 0,
    pagination = {
      pageIndex: 0,
      pageSize: 10,
    },
  }: {
    children: ReactNode;
    data: TData[];
    columns: ColumnDef<TData>[];
    totalRowCount?: number;
    pagination?: PaginationState;
  }) => {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {},
    );

    const table = useReactTable({
      data,
      columns,
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
      <TableContext.Provider value={{ table }}>
        {children}
      </TableContext.Provider>
    );
  };

  const useTableContext = () => {
    const context = useContext(TableContext);

    if (context === undefined) {
      throw new Error('useTableContext must be used within a TableProvider');
    }

    return context;
  };

  return { TableProvider, useTableContext };
};

export default createTableContext;
