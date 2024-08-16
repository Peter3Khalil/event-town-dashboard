'use client';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { AlertIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import UserForm from '@/components/users/UserForm';
import { USER_SCHEMA } from '@/constants/formSchemas';
import { withCategoriesProvider } from '@/HOC/data-providers';
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import UsersApi from '@/services/UsersApi';
import { FormInput, ResponseError, ValidationError } from '@/types/global.types';
import { User } from '@/types/users.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

const CREATE_USER_SCHEMA = USER_SCHEMA.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  },
);

const CreateUser = () => {
  const {toast} = useToast();
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/Create',
  });
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const form = useForm<z.infer<typeof CREATE_USER_SCHEMA>>({
    resolver: zodResolver(CREATE_USER_SCHEMA),
    mode: 'onSubmit',
  });
  const {
    formState: { isValid },
  } = form;

  const { mutate, isLoading } = useMutation(UsersApi.create, {
    onSuccess(data) {
      router.push(`/users/${data.data.data._id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof CREATE_USER_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
      else {
        const error = err as AxiosError<ResponseError>
        toast({
          title:"Error",
          description: error.response?.data.message || "An error occurred",
          variant: "destructive"
        })
      }
    },
  });

  function onSubmit(values: z.infer<typeof CREATE_USER_SCHEMA>) {
    mutate({
      ...values,
      profileImg,
    } as unknown as User);
  }

  usePageTitle('Create User');

  const formInputs: FormInput[] = useMemo(
    () => [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter Name',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter Email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter Password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Enter Confirm Password',
      },
      {
        name: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'Enter Location',
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'number',
        placeholder: 'Enter Phone',
      },
    ],
    [],
  );

  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Create User</PageTitle>
            {!isValid && (
              <MyTooltip
                className="bg-destructive"
                content={
                  <span className="text-xs text-destructive-foreground">
                    There are validation errors
                  </span>
                }
              >
                <AlertIcon size={20} className="text-destructive" />
              </MyTooltip>
            )}
          </div>
          <PageDescription>Add new user to your system</PageDescription>
        </div>
        <Button
          className="mt-6"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <UserForm
          form={form}
          profileImg={profileImg}
          formInputs={formInputs}
          // eslint-disable-next-line no-unused-vars
          setProfileImg={setProfileImg as (file: File | null | string) => void}
        />
      </ScrollArea>
    </PageContent>
  );
};

export default withCategoriesProvider(CreateUser);
