'use client';
import { COLUMNS } from '@/providers/users/COLUMNS';
import { User } from '@/types/users.types';
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
const UsersTableContext = createContext<ContextType<User>>({
  table: {} as Table<User>,
});

const UsersTableProvider = ({
  children,
  users = [],
  totalRowCount = 0,
  pagination = {
    pageIndex: 0,
    pageSize: 10,
  },
}: {
  children: React.ReactNode;
  users: User[];
  totalRowCount?: number;
  pagination?: PaginationState;
}) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: users,
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
    <UsersTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </UsersTableContext.Provider>
  );
};

const useUsersTable = () => {
  const context = useContext(UsersTableContext);

  if (context === undefined) {
    throw new Error('useUsersTable must be used within a UsersTableProvider');
  }

  return context;
};

export { UsersTableProvider, useUsersTable };
