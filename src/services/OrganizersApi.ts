import client from '@/lib/client';
import { APIInterface } from '@/services/APIInterface';
import { GetAllQueryParams } from '@/types/global.types';
import { GetAllOrganizersResponse, Organizer } from '@/types/organizer.types';
import { AxiosRequestConfig } from 'axios';

class OrganizersApi implements APIInterface<Organizer> {
  private static instance: OrganizersApi;

  private constructor() {}

  public static getInstance(): OrganizersApi {
    if (!OrganizersApi.instance) {
      OrganizersApi.instance = new OrganizersApi();
    }

    return OrganizersApi.instance;
  }

  public getAll(
    params?: Partial<GetAllQueryParams>,
    config?: AxiosRequestConfig,
  ) {
    return client.get<GetAllOrganizersResponse>('/organizers', {
      params,
      ...config,
    });
  }

  public getOne(id: string, config?: AxiosRequestConfig) {
    return client.get<{ data: Organizer }>(`/organizers/${id}`, config);
  }

  public create(
    organizer: Omit<Organizer, '_id' | 'createdAt' | 'updatedAt'>,
    config?: AxiosRequestConfig,
  ) {
    return client.post<{ data: Organizer }>('/organizers', organizer, config);
  }

  public update(
    updatedOrganizer: { id: string; data: Partial<Organizer> },
    config?: AxiosRequestConfig,
  ) {
    const { id, data: organizer } = updatedOrganizer;

    return client.put<Organizer>(`/organizers/${id}`, organizer, config);
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/organizers/${id}`, config);
  }
}

export default OrganizersApi.getInstance();
