import { useUsers } from '@/providers/users/users-provider';
import {
  COLUMNS,
  UsersTableProvider,
} from '@/providers/users/users-table-provider';

const withUsersTableProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithUsersTableProvider = (props: P) => {
    const {
      params,
      queryResult: { data },
    } = useUsers();

    return (
      <UsersTableProvider
        data={data?.data.data || []}
        columns={COLUMNS}
        totalRowCount={data?.data.totlaCount}
        pagination={{
          pageIndex: params.page - 1,
          pageSize: params.limit,
        }}
      >
        <Component {...props} />
      </UsersTableProvider>
    );
  };

  return WithUsersTableProvider;
};

export default withUsersTableProvider;
