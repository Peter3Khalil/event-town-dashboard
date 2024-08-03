import { OrganizersProvider } from '@/providers/organizers/organizers-provider';

const withOrganizersProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithOrganizersProvider = (props: P) => {
    return (
      <OrganizersProvider>
        <Component {...props} />
      </OrganizersProvider>
    );
  };

  return WithOrganizersProvider;
};

export default withOrganizersProvider;
