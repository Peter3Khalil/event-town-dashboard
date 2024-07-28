'use client';
import {
  FORM_FIELDS,
  FORM_SCHEMA,
} from '@/app/(dashboard)/users/constants/FORM_FIELDS';
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
import UserForm from '@/components/users/UserForm';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import UsersApi from '@/services/UsersApi';
import { ValidationError } from '@/types/global.types';
import { MutateUser } from '@/types/users.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const formFields = Object.entries(FORM_FIELDS)
  .map(([, value]) => {
    return value;
  })
  .filter((field) =>
    [
      'name',
      'email',
      'password',
      'confirmPassword',
      'location',
      'phone',
    ].includes(field.name),
  );

const CreateUser = () => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/Create',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<File | null | string>(null);
  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid, errors },
  } = form;

  const { mutate, isLoading } = useMutation(UsersApi.create, {
    onSuccess() {
      queryClient.invalidateQueries('users');
      router.push('/users');
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof FORM_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    mutate({
      ...values,
      profileImg: profileImg ?? '',
    } as unknown as MutateUser);
  }

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
            {Object.keys(errors).length > 0 && (
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
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <UserForm
          form={form}
          formFields={formFields}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
        />
      </ScrollArea>
    </PageContent>
  );
};

export default CreateUser;
