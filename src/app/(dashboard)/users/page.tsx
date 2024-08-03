'use client';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import ColumnsVisibilityDropMenu from '@/components/shared/ColumnsVisibilityDropMenu';
import CreateButton from '@/components/shared/CreateButton';
import { UserIcon } from '@/components/shared/Icons';
import PaginationControl from '@/components/shared/PaginationControl';
import Search from '@/components/shared/Search';
import TableViewer from '@/components/shared/TableViewer';
import { withUsersProvider } from '@/HOC/data-providers';
import { withUsersTableProvider } from '@/HOC/table-providers';
import usePageTitle from '@/hooks/usePageTitle';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { useUsers } from '@/providers/users/users-provider';
import { useUsersTable } from '@/providers/users/users-table-provider';

const Users = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/users/All Users' });
  const { table } = useUsersTable();
  const {
    params,
    setParams,
    queryResult: {
      data,
      refetch: refresh,
      isLoading,
      isFetching,
      isFetched,
      isCancelled,
      cancelQuery,
    },
  } = useUsers();

  const { RequestActionsButtons, requestState } = useRefetch({
    isFetching,
    isLoading,
    isFetched,
    isCancelled,
    refresh,
    cancelQuery,
  });

  usePageTitle('Users');

  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit flex-col sm:flex-row sm:items-center sm:gap-2">
            <PageTitle>
              Users (
              {params.keyword?.length && params.keyword?.length > 0
                ? data?.data.results
                : data?.data.totlaCount}
              )
            </PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all users in one place</PageDescription>
        </div>
        <CreateButton href="/users/create" icon={UserIcon}>
          Create User
        </CreateButton>
      </PageHeader>
      <div className="flex w-full items-center justify-between gap-2 pr-2">
        <Search setParams={setParams} />
        <ColumnsVisibilityDropMenu table={table} />
      </div>
      <TableViewer
        table={table}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <PaginationControl setParams={setParams} table={table} />
    </PageContent>
  );
};

export default withUsersProvider(withUsersTableProvider(Users));
