'use client';
import { FORM_SCHEMA } from '@/app/(dashboard)/users/constants/FORM_FIELDS';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { AlertIcon, UploadImageIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { useCategories } from '@/providers/categories/categories-provider';
import UsersApi from '@/services/UsersApi';
import { ValidationError } from '@/types/global.types';
import { MutateUser } from '@/types/users.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { memo, ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const FIELDS = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
  },
  { name: 'location', label: 'Location', placeholder: 'Location' },
  {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'Phone Number',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
  },
];

const CreateUser = () => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/Create',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleSubmit, register, control, setError, setValue, ...rest } =
    useForm<z.infer<typeof FORM_SCHEMA>>({
      resolver: zodResolver(FORM_SCHEMA),
      mode: 'onChange',
    });
  const {
    formState: { isValid, errors },
  } = rest;

  const {
    queryResult: { data, isLoading: isLoadingCategories },
  } = useCategories();
  const categories = data?.data.data;

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
          setError(e.path as unknown as keyof z.infer<typeof FORM_SCHEMA>, {
            message: e.msg,
          });
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    mutate({
      ...values,
      profileImg: values.profileImg?.item(0),
    } as unknown as MutateUser);
  }

  return (
    <PageContent>
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
            handleSubmit(onSubmit)();
          }}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <form>
          <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-4 md:w-[80%] lg:w-[50%]">
            {rest.getValues('profileImg')?.length > 0 ? (
              <div className="flex flex-col items-center gap-2 px-6">
                <ImagePreview
                  image={
                    rest.getValues('profileImg').item(0) as unknown as File
                  }
                />
                <Button
                  className="w-fit"
                  type="button"
                  variant={'secondary'}
                  onClick={() => setValue('profileImg', undefined)}
                >
                  Remove
                </Button>
                {errors.profileImg && (
                  <p className="text-center text-xs text-destructive">
                    {errors.profileImg.message as unknown as ReactNode}
                  </p>
                )}
              </div>
            ) : (
              <Label
                htmlFor="image"
                className="flex flex-col items-center text-primary"
              >
                <UploadImageIcon size={50} className="mb-2" />
                <p>Upload Image</p>
                <Input
                  id="image"
                  type="file"
                  className="hidden"
                  {...register('profileImg')}
                />
              </Label>
            )}
          </div>
          <div className="grid grid-cols-1 items-start gap-4 gap-y-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map((field, index) => (
              <div key={index} className="flex flex-col gap-1">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  type="text"
                  id={field.name}
                  placeholder={field.placeholder}
                  {...register(
                    field.name as unknown as keyof z.infer<typeof FORM_SCHEMA>,
                  )}
                  className="w-full focus-visible:border-primary focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                {errors[
                  field.name as unknown as keyof z.infer<typeof FORM_SCHEMA>
                ] && (
                  <p className="text-xs text-destructive">
                    {
                      errors[
                        field.name as unknown as keyof z.infer<
                          typeof FORM_SCHEMA
                        >
                      ]?.message as unknown as ReactNode
                    }
                  </p>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label>Role</Label>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="user"
                  render={({ field }) => (
                    <Select
                      defaultValue="user"
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue="male"
                  render={({ field }) => (
                    <RadioGroup
                      defaultValue="comfortable"
                      className="flex"
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          checked={field.value === 'male'}
                          value="male"
                          id="r1"
                        />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label>Interests</Label>
              <Separator className="h-[0.5px]" />
              {isLoadingCategories ? (
                <p>Loading...</p>
              ) : (
                <ul className="mt-4 flex flex-wrap gap-4 px-2">
                  <Controller
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <>
                        {categories?.map((category, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Checkbox
                              id={category._id}
                              onCheckedChange={(checked) => {
                                const values = field.value || [];

                                if (checked) {
                                  field.onChange([...values, category._id]);
                                } else {
                                  field.onChange(
                                    values.filter(
                                      (value) => value !== category._id,
                                    ),
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={category._id} className="text-xs">
                              {category.title}
                            </Label>
                          </li>
                        ))}
                      </>
                    )}
                  />
                </ul>
              )}
            </div>
          </div>
        </form>
      </ScrollArea>
    </PageContent>
  );
};

const ImagePreview = memo(({ image }: { image: File }) => {
  return (
    <div className="relative size-28 rounded-full">
      <Image
        src={URL.createObjectURL(image)}
        alt="profile"
        className="absolute left-0 top-0 size-full rounded-[inherit] object-cover"
        width={300}
        height={300}
      />
    </div>
  );
});

ImagePreview.displayName = 'ImagePreview';

export default CreateUser;
