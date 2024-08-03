'use client';
import FormSkeleton from '@/components/FormSkeleton';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { AlertIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import ImageUploaderSkeleton from '@/components/ui/ImageUploaderSkeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import UserForm from '@/components/users/UserForm';
import { USER_SCHEMA } from '@/constants/formSchemas';
import useCustomQuery from '@/hooks/useCustomQuery';
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import UsersApi from '@/services/UsersApi';
import { FormInput, ValidationError } from '@/types/global.types';
import { User } from '@/types/users.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const UPDATE_USER_SCHEMA = USER_SCHEMA.partial();

type UpdateUserProps = {
  params: {
    id: string;
  };
};

const UpdateUser: FC<UpdateUserProps> = ({ params: { id } }) => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/update user',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<File | null | string>(null);
  const form = useForm<z.infer<typeof UPDATE_USER_SCHEMA>>({
    resolver: zodResolver(UPDATE_USER_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid, errors },
  } = form;

  const { data, isLoading: isLoadingUser } = useCustomQuery(
    ['userDetails', [id]],
    () => UsersApi.getOne(id),
  );

  const userDetails = useMemo(() => data?.data.data, [data?.data.data]);

  const { mutate, isLoading } = useMutation(UsersApi.updateUser, {
    onSuccess() {
      queryClient.invalidateQueries('users');
      queryClient.invalidateQueries({ queryKey: ['userDetails', [id]] });
      router.push(`/users/${id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof UPDATE_USER_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof UPDATE_USER_SCHEMA>) {
    mutate({ id, user: { ...values, profileImg } as Partial<User> });
  }

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

  usePageTitle('Update User');

  // fill the form with the user details
  useEffect(() => {
    if (userDetails) {
      const { name, email, location, gender, phone, role } = userDetails;
      form.reset({
        name,
        email,
        location,
        gender,
        interests: userDetails?.interests
          ? userDetails?.interests.map((i) => i._id)
          : [],
        phone,
        role,
      });
      setProfileImg(userDetails?.profileImg ?? null);
    }
  }, [form, userDetails]);

  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Update User</PageTitle>
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
          <PageDescription>Update user data </PageDescription>
        </div>
        <Button
          className="mt-6"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <FormSkeleton
          className={cn({
            hidden: !isLoadingUser,
          })}
        >
          <ImageUploaderSkeleton />
        </FormSkeleton>
        <UserForm
          form={form}
          profileImg={profileImg}
          formInputs={formInputs}
          setProfileImg={setProfileImg}
          className={cn({
            hidden: isLoadingUser,
          })}
        />
      </ScrollArea>
    </PageContent>
  );
};

export default UpdateUser;
