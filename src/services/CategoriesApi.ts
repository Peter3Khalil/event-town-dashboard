import client from '@/lib/client';
import { APIInterface } from '@/services/APIInterface';
import { Category, GetAllCategoriesResponse } from '@/types/categories.types';
import { GetAllQueryParams } from '@/types/global.types';
import { AxiosRequestConfig } from 'axios';

class CategoriesApi implements APIInterface<Category> {
  private static instance: CategoriesApi;

  private constructor() {}

  public getOne(id: string, config?: AxiosRequestConfig) {
    return client.get<{ data: Category }>(`/categories/${id}`, config);
  }

  public static getInstance(): CategoriesApi {
    if (!CategoriesApi.instance) {
      CategoriesApi.instance = new CategoriesApi();
    }

    return CategoriesApi.instance;
  }

  public getAll(
    params?: Partial<GetAllQueryParams>,
    config?: AxiosRequestConfig,
  ) {
    return client.get<GetAllCategoriesResponse>('/categories', {
      params,
      ...config,
    });
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/categories/${id}`, config);
  }

  public create(category: { title: string }, config?: AxiosRequestConfig) {
    return client.post<{ data: Category }>('/categories', category, config);
  }
  public update(
    category: { id: string; data: Partial<Category> },
    config?: AxiosRequestConfig,
  ) {
    const { id, ...rest } = category;
    return client.put<Category>(`/categories/${id}`, rest, config);
  }
}

export default CategoriesApi.getInstance();
