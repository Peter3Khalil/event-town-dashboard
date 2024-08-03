'use client';
import EventForm from '@/components/events/EventForm';
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
import { EVENT_SCHEMA } from '@/constants/formSchemas';
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import {
  isStartTimeAndStartDateTheSame,
  isStartTimeSmallerThanEndTime,
} from '@/lib/refineEventSchema';
import { cn } from '@/lib/utils';
import EventsApi from '@/services/EventsApi';
import { NewEventType } from '@/types/event.types';
import { FormInput, ValidationError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const CREATE_EVENT_SCHEMA = EVENT_SCHEMA.refine(isStartTimeSmallerThanEndTime, {
  message: 'Event end time must be after event start time',
  path: ['eventEndTime'],
}).refine(isStartTimeAndStartDateTheSame, {
  message: 'Event start time must be on the same day as the event date',
  path: ['eventStartTime'],
});

type MyFormInput = FormInput & {
  name: keyof z.infer<typeof EVENT_SCHEMA>;
};

const CreateEvent = () => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/Events/Create',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [image, setImage] = useState<File | null | string>(null);
  const form = useForm<z.infer<typeof CREATE_EVENT_SCHEMA>>({
    resolver: zodResolver(CREATE_EVENT_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid },
  } = form;

  const { mutate, isLoading } = useMutation(EventsApi.create, {
    onSuccess(data) {
      queryClient.invalidateQueries('events');
      router.push(`/events/${data.data.data._id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof CREATE_EVENT_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof CREATE_EVENT_SCHEMA>) {
    mutate({ ...values, eventImage: image } as unknown as NewEventType);
  }

  const formInputs: MyFormInput[] = useMemo(
    () => [
      {
        name: 'organizerName',
        label: 'Organizer Name',
        placeholder: 'Enter Organizer Name',
      },
      {
        name: 'organizationName',
        label: 'Organization',
        placeholder: 'Enter Organization Name',
      },
      {
        name: 'organizationPhoneNumber',
        label: 'Organization Phone Number',
        type: 'tel',
        placeholder: 'Enter Phone Number',
      },
      {
        name: 'organizationEmail',
        label: 'Organization Email',
        type: 'email',
        placeholder: 'Enter Email',
      },
      {
        name: 'organizationWebsite',
        label: 'Organization Website',
        placeholder: 'Enter Website',
      },
      {
        name: 'eventName',
        label: 'Event Name',
        placeholder: 'Enter Event Name',
      },
      {
        name: 'eventAddress',
        label: 'Event Address',
        placeholder: 'Enter Event Address',
      },
      {
        name: 'eventDate',
        label: 'Event Date',
        type: 'date',
        placeholder: 'Enter Event Date',
      },
      {
        name: 'eventStartTime',
        label: 'Event Start Time',
        type: 'datetime-local',
        placeholder: 'Enter Event Start Time',
      },
      {
        name: 'eventEndTime',
        label: 'Event End Time',
        type: 'datetime-local',
        placeholder: 'Enter Event End Time',
      },
      {
        name: 'eventLocation',
        label: 'Event Location',
        placeholder: 'Enter Event Location',
      },
      {
        name: 'ticketEventLink',
        label: 'Ticket Event Link',
        placeholder: 'Enter Ticket Event Link',
      },
      {
        name: 'eventPrice',
        label: 'Event Price',
        type: 'number',
        placeholder: 'Enter Event Price',
      },
      {
        name: 'eventDescription',
        label: 'Event Description',
        placeholder: 'Enter Event Description',
      },
      {
        name: 'eventPlace',
        label: 'Event Place',
        placeholder: 'Enter Event Place',
      },
    ],
    [],
  );
  usePageTitle('Create Event');

  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Create Event</PageTitle>
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
          <PageDescription>Add new event to your system</PageDescription>
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
        <EventForm
          form={form}
          formInputs={formInputs}
          eventImage={image}
          setEventImage={setImage}
        />
      </ScrollArea>
    </PageContent>
  );
};

export default CreateEvent;
