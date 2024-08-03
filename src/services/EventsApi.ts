import client from '@/lib/client';
import { toFormData } from '@/lib/utils';
import {
  Event,
  EventAction,
  EventsQueryParams,
  GetAllEventsResponse,
  NewEventType,
} from '@/types/event.types';
import { AxiosRequestConfig } from 'axios';

class EventsApi {
  private static instance: EventsApi;

  private constructor() {}

  public static getInstance(): EventsApi {
    if (!EventsApi.instance) {
      EventsApi.instance = new EventsApi();
    }

    return EventsApi.instance;
  }

  public getAll(
    params?: Partial<EventsQueryParams>,
    config?: AxiosRequestConfig,
  ) {
    return client.get<GetAllEventsResponse>('/events', {
      params: {
        ...params,
        eventStatus:
          params?.eventStatus === 'all' ? undefined : params?.eventStatus,
      } as Partial<EventsQueryParams>,
      ...config,
    });
  }

  public getOne(id: string, config?: AxiosRequestConfig) {
    return client.get<{ data: Event }>(`/events/${id}`, config);
  }

  public create(event: NewEventType, config?: AxiosRequestConfig) {
    const formData = toFormData(event);

    return client.post<{ data: Event }>('/events', formData, config);
  }

  public update(
    updatedEvent: { id: string; event: Partial<Event> },
    config?: AxiosRequestConfig,
  ) {
    const { id, event } = updatedEvent;
    const formData = toFormData(event);

    return client.put<Event>(`/events/${id}`, formData, config);
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/events/${id}`, config);
  }

  public accept(
    payload: { id: string; expirePlanDate?: string | Date },
    config?: AxiosRequestConfig,
  ) {
    const expirePlanDate = payload.expirePlanDate;
    return client.put<EventAction>(
      `/events/${payload.id}/accept`,
      { expirePlanDate },
      config,
    );
  }

  public reject(id: string, config?: AxiosRequestConfig) {
    return client.put<EventAction>(`/events/${id}/reject`, config);
  }
}

export default EventsApi.getInstance();
