/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
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
}

const DeleteButton = <TData extends { _id: string }>({
  model,
  deleteFunction,
  invalidateKey,
  children,
  ...props
}: DeleteButtonProps<TData>) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isLoading } = useMutation(deleteFunction, {
    onSettled: () => {
      if (invalidateKey) queryClient.invalidateQueries(invalidateKey);
    },
    onSuccess() {
      router.push('/users');
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
      {children}
    </Button>
  );
};

export default DeleteButton;
