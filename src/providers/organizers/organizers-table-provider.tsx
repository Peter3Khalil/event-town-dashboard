'use client';
import { COLUMNS } from '@/providers/organizers/COLUMNS';
import { useOrganizers } from '@/providers/organizers/organizers-provider';
import { Organizer } from '@/types/organizer.types';
import {
  getCoreRowModel,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';

type ContextType<TData> = {
  table: Table<TData>;
};
const OrganizersTableContext = createContext<ContextType<Organizer>>({
  table: {} as Table<Organizer>,
});

const OrganizersTableProvider = ({
  children,
  organizers = [],
}: {
  children: React.ReactNode;
  organizers: Organizer[];
}) => {
  const {
    params,
    queryResult: { data },
  } = useOrganizers();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: organizers,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination: {
        pageIndex: params.page - 1 || 0,
        pageSize: params.limit || 10,
      },
      columnVisibility,
    },
    rowCount: data?.data.totlaCount || 0,
  });

  return (
    <OrganizersTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </OrganizersTableContext.Provider>
  );
};

const useOrganizersTable = () => {
  const context = useContext(OrganizersTableContext);

  if (context === undefined) {
    throw new Error(
      'useOrganizersTable must be used within a OrganizersTableProvider',
    );
  }

  return context;
};

export { OrganizersTableProvider, useOrganizersTable };
