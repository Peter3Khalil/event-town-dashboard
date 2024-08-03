import { useOrganizers } from '@/providers/organizers/organizers-provider';
import {
  OrganizersTableProvider,
  COLUMNS,
} from '@/providers/organizers/organizers-table-provider';

const withOrganizersTableProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithOrganizersTableProvider = (props: P) => {
    const {
      params,
      queryResult: { data },
    } = useOrganizers();

    return (
      <OrganizersTableProvider
        data={data?.data.data || []}
        columns={COLUMNS}
        totalRowCount={data?.data.totlaCount}
        pagination={{
          pageIndex: params.page - 1,
          pageSize: params.limit,
        }}
      >
        <Component {...props} />
      </OrganizersTableProvider>
    );
  };

  return WithOrganizersTableProvider;
};

export default withOrganizersTableProvider;
