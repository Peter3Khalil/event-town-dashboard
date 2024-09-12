'use client';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import ColumnsVisibilityDropMenu from '@/components/shared/ColumnsVisibilityDropMenu';
import CreateButton from '@/components/shared/CreateButton';
import { OrganizerIcon } from '@/components/shared/Icons';
import PaginationControl from '@/components/shared/PaginationControl';
import Search from '@/components/shared/Search';
import TableViewer from '@/components/shared/TableViewer';
import withOrganizersProvider from '@/HOC/data-providers/withOrganizersProvider';
import { withOrganizersTableProvider } from '@/HOC/table-providers';
import usePageTitle from '@/hooks/usePageTitle';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { pipe } from '@/lib/utils';
import { useOrganizers } from '@/providers/organizers/organizers-provider';
import { useOrganizersTable } from '@/providers/organizers/organizers-table-provider';

const Organizers = () => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/organizers/All Organizers',
  });

  const { table } = useOrganizersTable();
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
  } = useOrganizers();

  const { RequestActionsButtons, requestState } = useRefetch({
    isFetching,
    isLoading,
    isFetched,
    isCancelled,
    refresh,
    cancelQuery,
  });

  usePageTitle('Organizers');

  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit flex-col sm:flex-row sm:items-center sm:gap-2">
            <PageTitle>
              Organizers (
              {params.keyword?.length && params.keyword?.length > 0
                ? data?.data.results
                : data?.data.totlaCount}
              )
            </PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all organizers in one place</PageDescription>
        </div>
        <CreateButton href="/organizers/create" icon={OrganizerIcon}>
          Create Organizer
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

export default pipe(
  withOrganizersTableProvider,
  withOrganizersProvider,
)(Organizers);
