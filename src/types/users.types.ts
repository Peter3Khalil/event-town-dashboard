import { GetAllResponse } from '@/types/global.types';

export type LoginResponse = {
  data: User;
  token: string;
};

export type GetAllUsersResponse = GetAllResponse<User>;

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  gender: string;
  phone: string;
  interests: Interest[];
  slug?: string;
  isOAuthUser: boolean;
  emailVerifyCode?: string;
  emailVerifyExpires?: string;
  emailVerified?: boolean;
  role: 'user' | 'admin';
  active?: boolean;
  wishlist: unknown[];
  calendar: unknown[];
  profileImg?: string;
  token?: string;
};

type Interest = {
  _id: string;
  title: string;
};

export type MutateUser = Omit<
  User,
  | 'profileImg'
  | 'slug'
  | 'emailVerifyCode'
  | 'emailVerifyExpires'
  | 'emailVerified'
  | 'active'
  | 'wishlist'
  | 'calendar'
  | 'token'
  | '_id'
  | 'isOAuthUser'
> & {
  profileImg?: File;
  confirmPassword: string;
};
