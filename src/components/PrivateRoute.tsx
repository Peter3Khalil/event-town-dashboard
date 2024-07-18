'use client';
import { BRAND_COLOR } from '@/constants';
import { useAuth } from '@/providers/auth-provider';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isError, isSuccess, isLoading, user } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      const isAdmin = user.role === 'admin';

      if (!isAdmin) {
        window.location.href = '/login';
      }

      setIsAuthenticated(isAdmin);
    }
  }, [isSuccess, user.role]);

  useEffect(() => {
    if (isError) {
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex h-svh w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <BeatLoader color={BRAND_COLOR} size={20} />
          <p className="text-center text-sm">
            <span className="font-medium">Please wait a moment...</span>
            <br />
            <span className="text-muted-foreground">
              we are checking your credentials.
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
