import client from '@/lib/client';
import { Category, GetAllCategoriesResponse } from '@/types/categories.types';
import { GetAllQueryParams } from '@/types/global.types';
import { AxiosRequestConfig } from 'axios';

class CategoriesApi {
  private static instance: CategoriesApi;

  private constructor() {}

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
    return client.post<Category>('/categories', category, config);
  }
}

export default CategoriesApi.getInstance();
