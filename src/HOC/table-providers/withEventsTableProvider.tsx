import { useEvents } from '@/providers/events/events-provider';
import { EventsTableProvider } from '@/providers/events/events-table-provider';

const withEventsTableProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithEventsTableProvider = (props: P) => {
    const {
      params,
      queryResult: { data },
    } = useEvents();

    return (
      <EventsTableProvider
        events={data?.data.data || []}
        totalRowCount={data?.data.totlaCount}
        pagination={{
          pageIndex: params.page - 1,
          pageSize: params.limit,
        }}
      >
        <Component {...props} />
      </EventsTableProvider>
    );
  };

  return WithEventsTableProvider;
};

export default withEventsTableProvider;
