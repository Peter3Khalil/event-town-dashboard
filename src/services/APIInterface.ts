/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetAllQueryParams, GetAllResponse } from '@/types/global.types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface APIInterface<TData, ParamsType = GetAllQueryParams> {
  getAll: (
    params?: Partial<ParamsType>,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<GetAllResponse<TData>, unknown>>;
  getOne: (
    id: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<{ data: TData }, unknown>>;
  create: (
    data: TData,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<{ data: TData }, unknown>>;
  update: (
    data: { id: string; data: Partial<TData> },
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<TData, unknown>>;
  delete: (
    // eslint-disable-next-line no-unused-vars
    id: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<any, any>>;
}
