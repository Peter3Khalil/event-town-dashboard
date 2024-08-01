/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface DeleteButtonProps<TData extends { _id: string }>
  extends React.ComponentProps<typeof Button> {
  model: TData;
  deleteFunction: (
    id: string,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<any, any>>;
  invalidateKey?: string;
  onSuccess?: () => void;
}

const DeleteButton = <TData extends { _id: string }>({
  model,
  deleteFunction,
  invalidateKey,
  children,
  onSuccess,
  ...props
}: DeleteButtonProps<TData>) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteFunction, {
    onSuccess,
    onSettled: () => {
      if (invalidateKey) queryClient.invalidateQueries(invalidateKey);
    },
  });

  const handleDelete = useCallback(() => {
    mutate(model._id);
  }, [model._id, mutate]);

  return (
    <Button
      onClick={handleDelete}
      variant={'destructive'}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? `${children}...` : children}
    </Button>
  );
};

export default DeleteButton;
