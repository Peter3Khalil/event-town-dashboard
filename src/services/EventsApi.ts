import client from '@/lib/client';
import {
  EventsQueryParams,
  GetAllEventsResponse,
  EventAction,
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
    return client.get<Event>(`/events/${id}`, config);
  }

  public create(event: Event, config?: AxiosRequestConfig) {
    return client.post<Event>('/events', event, config);
  }

  public update(
    id: string,
    event: Partial<Event>,
    config?: AxiosRequestConfig,
  ) {
    return client.put<Event>(`/events/${id}`, event, config);
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/events/${id}`, config);
  }

  public accept(id: string, config?: AxiosRequestConfig) {
    return client.put<EventAction>(`/events/${id}/accept`, config);
  }

  public reject(id: string, config?: AxiosRequestConfig) {
    return client.put<EventAction>(`/events/${id}/reject`, config);
  }
}

export default EventsApi.getInstance();
