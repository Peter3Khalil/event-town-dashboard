import createDataContext from '@/providers/data-provider';
import OrganizersApi from '@/services/OrganizersApi';
import { Organizer } from '@/types/organizer.types';

const { ContextProvider: OrganizersProvider, useDataProvider: useOrganizers } =
  createDataContext<Organizer>({
    ApiClass: OrganizersApi,
    queryKey: 'organizers',
  });

export { OrganizersProvider, useOrganizers };
