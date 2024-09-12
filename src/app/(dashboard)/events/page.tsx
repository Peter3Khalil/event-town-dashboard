'use client';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import ColumnsVisibilityDropMenu from '@/components/shared/ColumnsVisibilityDropMenu';
import CreateButton from '@/components/shared/CreateButton';
import { CalendarPlusIcon } from '@/components/shared/Icons';
import PaginationControl from '@/components/shared/PaginationControl';
import Search from '@/components/shared/Search';
import TableViewer from '@/components/shared/TableViewer';
import { withEventsProvider } from '@/HOC/data-providers';
import { withEventsTableProvider } from '@/HOC/table-providers';
import usePageTitle from '@/hooks/usePageTitle';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { pipe } from '@/lib/utils';
import { useEvents } from '@/providers/events/events-provider';
import { useEventsTable } from '@/providers/events/events-table-provider';

const Events = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/All Events' });
  const { table } = useEventsTable();
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
  } = useEvents();

  const { RequestActionsButtons, requestState } = useRefetch({
    isFetching,
    isLoading,
    isFetched,
    isCancelled,
    refresh,
    cancelQuery,
  });
  usePageTitle('Events');
  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit flex-col sm:flex-row sm:items-center sm:gap-2">
            <PageTitle>
              Events (
              {params.keyword?.length && params.keyword?.length > 0
                ? data?.data.results
                : data?.data.totlaCount}
              )
            </PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all events in one place</PageDescription>
        </div>
        <CreateButton href="/events/create" icon={CalendarPlusIcon}>
          Create Event
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

export default pipe(withEventsTableProvider, withEventsProvider)(Events);
