import { EventsProvider } from '@/providers/events/events-provider';

const withEventsProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithEventsProvider = (props: P) => {
    return (
      <EventsProvider>
        <Component {...props} />
      </EventsProvider>
    );
  };

  return WithEventsProvider;
};

export default withEventsProvider;
