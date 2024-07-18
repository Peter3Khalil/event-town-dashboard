import client from '@/lib/client';
import { GetAllQueryParams } from '@/types/global.types';
import {
  GetAllUsersResponse,
  LoginResponse,
  MutateUser,
  User,
} from '@/types/users.types';
import { AxiosRequestConfig } from 'axios';

class UsersApi {
  private static instance: UsersApi;

  private constructor() {}

  public static getInstance(): UsersApi {
    if (!UsersApi.instance) {
      UsersApi.instance = new UsersApi();
    }

    return UsersApi.instance;
  }

  public getAll(
    params?: Partial<GetAllQueryParams>,
    config?: AxiosRequestConfig,
  ) {
    return client.get<GetAllUsersResponse>('/users', {
      params,
      ...config,
    });
  }

  public getOne(id: string, config?: AxiosRequestConfig) {
    return client.get<{ data: Omit<User, 'token'> }>(`/users/${id}`, config);
  }

  public getMe(config?: AxiosRequestConfig) {
    return client.get<Omit<LoginResponse, 'token'>>('/users/getMe', config);
  }

  public create(user: MutateUser, config?: AxiosRequestConfig) {
    return client.post<User>('/users', user, config);
  }

  public updateUser(
    id: string,
    user: Partial<User>,
    config?: AxiosRequestConfig,
  ) {
    return client.put<User>(`/users/${id}`, user, config);
  }

  public updateMyData(user: Partial<MutateUser>, config?: AxiosRequestConfig) {
    return client.put<User>(`/users/changeMyData`, user, config);
  }

  public changeUserPassword(
    id: string,
    data: {
      currentPassword: string;
      password: string;
      confirmPassword: string;
    },
    config?: AxiosRequestConfig,
  ) {
    return client.put<User>(`/users/changePassword/${id}`, data, config);
  }

  public changeMyPassword(
    data: {
      currentPassword: string;
      password: string;
      confirmPassword: string;
    },
    config?: AxiosRequestConfig,
  ) {
    return client.put<User>(`/users/changeMyPassword`, data, config);
  }

  public delete(id: string, config?: AxiosRequestConfig) {
    return client.delete(`/users/${id}`, config);
  }

  public login({
    email,
    password,
    config,
  }: {
    email: string;
    password: string;
    config?: AxiosRequestConfig;
  }) {
    return client.post<LoginResponse>(
      '/auth/login',
      {
        email,
        password,
      },
      config,
    );
  }
}

export default UsersApi.getInstance();
