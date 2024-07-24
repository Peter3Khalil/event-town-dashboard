'use client';
import { FORM_FIELDS } from '@/app/(dashboard)/users/constants/FORM_FIELDS';
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
import useCustomQuery from '@/hooks/useCustomQuery';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import UsersApi from '@/services/UsersApi';
import { ValidationError } from '@/types/global.types';
import { User } from '@/types/users.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

type UpdateUserProps = {
  params: {
    id: string;
  };
};

const formFields = Object.entries(FORM_FIELDS)
  .map(([, value]) => {
    return value;
  })
  .filter((field) =>
    ['name', 'email', 'location', 'phone'].includes(field.name),
  );

const UPDATE_USER_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  email: z.string().email('Invalid email address'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters long')
    .max(50, 'Location must be at most 50 characters long'),
  gender: z.string().default('male'),
  role: z.string().optional().default('user'),
  phone: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

const UpdateUser: FC<UpdateUserProps> = ({ params: { id } }) => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/update user',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<File | null | string>(null);
  const form = useForm<z.infer<typeof UPDATE_USER_FORM_SCHEMA>>({
    resolver: zodResolver(UPDATE_USER_FORM_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid, errors },
  } = form;

  const { data } = useCustomQuery(
    ['userDetails', [id]],
    () => UsersApi.getOne(id),
    {
      cacheTime: 0,
    },
  );

  const userDetails = useMemo(() => data?.data.data, [data?.data.data]);

  const { mutate, isLoading } = useMutation(UsersApi.updateUser, {
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
            e.path as unknown as keyof z.infer<typeof UPDATE_USER_FORM_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof UPDATE_USER_FORM_SCHEMA>) {
    mutate({ id, user: values as Partial<User> });
  }

  // fill the form with the user details
  useEffect(() => {
    if (userDetails) {
      const { name, email, location, gender, interests, phone, role } =
        userDetails;
      form.reset({
        name,
        email,
        location,
        gender,
        interests: interests.map((i) => i._id),
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

export default UpdateUser;
