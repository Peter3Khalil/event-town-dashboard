'use client';
import FormSkeleton from '@/components/FormSkeleton';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import OrganizerForm from '@/components/organizer/OrganizerForm';
import { AlertIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ORGANIZER_SCHEMA } from '@/constants/formSchemas';
import useCustomQuery from '@/hooks/useCustomQuery';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import OrganizersApi from '@/services/OrganizersApi';
import { FormInput, ValidationError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';
type MyFormInput = FormInput & {
  name: keyof z.infer<typeof ORGANIZER_SCHEMA>;
};
const UPDATE_ORGANIZER_SCHEMA = ORGANIZER_SCHEMA.partial();

type UpdateOrganizerProps = {
  params: {
    id: string;
  };
};

const UpdateOrganizer: FC<UpdateOrganizerProps> = ({ params: { id } }) => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/organizers/update organizer',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof UPDATE_ORGANIZER_SCHEMA>>({
    resolver: zodResolver(UPDATE_ORGANIZER_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid, errors },
  } = form;

  const { data, isLoading: isLoadingOrganizer } = useCustomQuery(
    ['organizerDetails', [id]],
    () => OrganizersApi.getOne(id),
    {
      cacheTime: 0,
    },
  );

  const organizerDetails = useMemo(() => data?.data.data, [data?.data.data]);

  const { mutate, isLoading } = useMutation(OrganizersApi.update, {
    onSuccess() {
      queryClient.invalidateQueries('organizers');
      router.push(`/organizers/${id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof UPDATE_ORGANIZER_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof UPDATE_ORGANIZER_SCHEMA>) {
    mutate({ id, organizer: values });
  }

  const formInputs: MyFormInput[] = useMemo(
    (): MyFormInput[] => [
      {
        name: 'organizerName',
        label: 'Organizer Name',
        placeholder: 'Enter Organizer Name',
      },
      {
        name: 'organizationEmail',
        label: 'Organization Email',
        type: 'email',
        placeholder: 'Enter Organization Email',
      },
      {
        name: 'organizationPhoneNumber',
        label: 'Organization Phone',
        placeholder: 'Enter Organization Phone',
      },
      {
        name: 'organizationName',
        label: 'Organization Name',
        placeholder: 'Enter Organization Name',
      },
      {
        name: 'organizationField',
        label: 'Organization Field',
        placeholder: 'Technology, Education, etc.',
      },
      {
        name: 'organizationWebsite',
        label: 'Organization Website',
        placeholder: 'Enter Organization Website',
      },
      {
        name: 'advice',
        label: 'Advice',
        placeholder: 'Enter Advice',
      },
    ],
    [],
  );

  // fill the form with the user details
  useEffect(() => {
    if (organizerDetails) {
      form.reset(organizerDetails);
    }
  }, [form, organizerDetails]);

  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Update Organizer</PageTitle>
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
          <PageDescription>Update Organizer data </PageDescription>
        </div>
        <Button
          type="button"
          className="mt-6"
          onClick={form.handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <FormSkeleton
          className={cn({
            hidden: !isLoadingOrganizer,
          })}
          count={7}
        />
        <OrganizerForm
          form={form}
          formInputs={formInputs}
          className={cn({
            hidden: isLoadingOrganizer,
          })}
        />
      </ScrollArea>
    </PageContent>
  );
};

export default UpdateOrganizer;
