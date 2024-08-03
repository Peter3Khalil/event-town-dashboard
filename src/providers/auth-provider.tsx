'use client';
import useCustomQuery from '@/hooks/useCustomQuery';
import UsersApi from '@/services/UsersApi';
import { User } from '@/types/users.types';
import { createContext, useContext } from 'react';
const initialUser: User = {
  email: '',
  _id: '',
  active: false,
  calendar: [],
  emailVerified: false,
  gender: 'male',
  interests: [],
  isOAuthUser: false,
  location: '',
  name: '',
  password: '',
  phone: '',
  profileImg: '',
  role: 'user',
  slug: '',
  wishlist: [],
};

type ContextType = {
  user: User;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
};
const AuthContext = createContext<ContextType>({
  user: initialUser,
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: undefined,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isError, isSuccess, isLoading, error } = useCustomQuery(
    'getUser',
    UsersApi.getMe,
  );

  return (
    <AuthContext.Provider
      value={{
        user: data?.data.data || initialUser,
        isError,
        isLoading,
        isSuccess,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
