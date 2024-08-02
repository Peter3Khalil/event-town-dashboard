import client from '@/lib/client';
import { convertObjToFormData } from '@/lib/utils';
import { GetAllQueryParams } from '@/types/global.types';
import { GetAllOrganizersResponse, Organizer } from '@/types/organizer.types';
import { AxiosRequestConfig } from 'axios';

class OrganizersApi {
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

  public create(organizer: Organizer, config?: AxiosRequestConfig) {
    const formData = convertObjToFormData(organizer);

    return client.post<Organizer>('/organizers', formData, config);
  }

  public update(
    updatedOrganizer: { id: string; organizer: Partial<Organizer> },
    config?: AxiosRequestConfig,
  ) {
    const { id, organizer } = updatedOrganizer;
    const formData = convertObjToFormData(organizer);

    return client.put<Organizer>(`/organizers/${id}`, formData, config);
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/organizers/${id}`, config);
  }
}

export default OrganizersApi.getInstance();
