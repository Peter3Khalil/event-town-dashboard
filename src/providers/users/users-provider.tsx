import createDataContext from '@/providers/data-provider';
import UsersApi from '@/services/UsersApi';
import { User } from '@/types/users.types';

const { ContextProvider: UsersProvider, useDataProvider: useUsers } =
  createDataContext<User>({
    ApiClass: UsersApi,
    queryKey: 'users',
  });

export { UsersProvider, useUsers };
