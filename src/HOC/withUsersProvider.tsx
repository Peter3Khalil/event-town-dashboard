import { UsersProvider } from '@/providers/users/users-provider';

const withUsersProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithUsersProvider = (props: P) => {
    return (
      <UsersProvider>
        <Component {...props} />
      </UsersProvider>
    );
  };

  return WithUsersProvider;
};

export default withUsersProvider;
