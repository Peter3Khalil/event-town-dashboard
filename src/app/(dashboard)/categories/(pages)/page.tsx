'use client';
import CreateCategoryDialog from '@/components/category/CreateCategoryDialog';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import ColumnsVisibilityDropMenu from '@/components/shared/ColumnsVisibilityDropMenu';
import PaginationControl from '@/components/shared/PaginationControl';
import Search from '@/components/shared/Search';
import TableViewer from '@/components/shared/TableViewer';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { useCategories } from '@/providers/categories/categories-provider';
import {
  CategoriesTableProvider,
  useCategoriesTable,
} from '@/providers/categories/categories-table-provider';

const Categories = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/categories/All Categories' });
  const { table } = useCategoriesTable();
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
  } = useCategories();

  const { RequestActionsButtons, requestState } = useRefetch({
    isFetching,
    isLoading,
    isFetched,
    isCancelled,
    refresh,
    cancelQuery,
  });

  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit flex-col sm:flex-row sm:items-center sm:gap-2">
            <PageTitle>
              Categories (
              {params.keyword?.length && params.keyword?.length > 0
                ? data?.data.results
                : data?.data.totlaCount}
              )
            </PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all categories in one place</PageDescription>
        </div>

        <CreateCategoryDialog />
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

const Wrapper = () => {
  const {
    queryResult: { data },
  } = useCategories();
  return (
    <CategoriesTableProvider categories={data?.data.data || []}>
      <Categories />
    </CategoriesTableProvider>
  );
};
export default Wrapper;
