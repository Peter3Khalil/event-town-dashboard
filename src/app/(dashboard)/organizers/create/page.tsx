'use client';
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
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import OrganizersApi from '@/services/OrganizersApi';
import { FormInput, ValidationError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

type MyFormInput = FormInput & {
  name: keyof z.infer<typeof ORGANIZER_SCHEMA>;
};

const CreateOrganizer = () => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/organizers/Create',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof ORGANIZER_SCHEMA>>({
    resolver: zodResolver(ORGANIZER_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid },
  } = form;

  const { mutate, isLoading } = useMutation(OrganizersApi.create, {
    onSuccess(data) {
      queryClient.invalidateQueries('organizers');
      router.push(`/organizers/${data.data.data._id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof ORGANIZER_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof ORGANIZER_SCHEMA>) {
    mutate(values);
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
        type: 'tel',
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
        type: 'textarea',
        placeholder: 'Enter Advice',
      },
    ],
    [],
  );

  usePageTitle('Create Organizer');
  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Create Organizer</PageTitle>
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
          <PageDescription>Add new organizer to your system</PageDescription>
        </div>
        <Button
          type="button"
          className="mt-6"
          onClick={form.handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </PageHeader>
      <ScrollArea>
        <OrganizerForm form={form} formInputs={formInputs} />
      </ScrollArea>
    </PageContent>
  );
};

export default CreateOrganizer;
