import createDataContext from '@/providers/data-provider';
import EventsApi from '@/services/EventsApi';
import { Event, EventsQueryParams } from '@/types/event.types';

const { ContextProvider: EventsProvider, useDataProvider: useEvents } =
  createDataContext<Event, EventsQueryParams>({
    ApiClass: EventsApi,
    queryKey: 'events',
  });

export { EventsProvider, useEvents };
