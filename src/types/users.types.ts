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
  gender: 'male' | 'female';
  phone: string;
  interests?: Interest[];
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

export type NewUserType = Pick<
  User,
  'name' | 'email' | 'password' | 'location' | 'gender' | 'role' | 'phone'
> & {
  interests?: string[];
  profileImg?: File | null;
  confirmPassword: string;
};
