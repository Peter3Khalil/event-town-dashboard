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
import useCustomQuery from '@/hooks/useCustomQuery';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn, formatDate } from '@/lib/utils';
import EventsApi from '@/services/EventsApi';
import { Event } from '@/types/event.types';
import { FormInput, ValidationError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

type UpdateEventProps = {
  params: {
    id: string;
  };
};
const UPDATE_EVENT_SCHEMA = EVENT_SCHEMA.omit({ eventCategory: true })
  .refine(
    (data) =>
      new Date(data.eventStartTime).getTime() <
      new Date(data.eventEndTime).getTime(),
    {
      message: 'Event end time must be after event start time',
      path: ['eventEndTime'],
    },
  )
  .refine(
    (data) => {
      const startDate = new Date(data.eventDate).toString();
      const startDateTime = new Date(data.eventStartTime).toString();
      return formatDate(startDate) === formatDate(startDateTime);
    },
    {
      message: 'Event start time must be on the same day as the event date',
      path: ['eventStartTime'],
    },
  );

type MyFormInput = FormInput & {
  name: keyof z.infer<typeof UPDATE_EVENT_SCHEMA>;
};

const UpdateEvent: FC<UpdateEventProps> = ({ params: { id } }) => {
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/Events/Update',
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [image, setImage] = useState<File | null | string>(null);
  const form = useForm<z.infer<typeof UPDATE_EVENT_SCHEMA>>({
    resolver: zodResolver(UPDATE_EVENT_SCHEMA),
    mode: 'onChange',
  });
  const {
    formState: { isValid, errors },
  } = form;

  const { data } = useCustomQuery(
    ['eventDetails', [id]],
    () => EventsApi.getOne(id),
    {
      cacheTime: 0,
    },
  );

  const eventDetails = useMemo(() => data?.data.data, [data?.data.data]);

  const { mutate, isLoading } = useMutation(EventsApi.update, {
    onSuccess() {
      queryClient.invalidateQueries('events');
      router.push(`/events/${id}`);
    },
    onError(err) {
      const error = err as AxiosError<ValidationError>;

      if (error.response?.data && error.response?.data.errors.length > 0) {
        const errors = error.response.data.errors;
        errors.map((e) => {
          form.setError(
            e.path as unknown as keyof z.infer<typeof UPDATE_EVENT_SCHEMA>,
            {
              message: e.msg,
            },
          );
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof UPDATE_EVENT_SCHEMA>) {
    mutate({ id, event: values as unknown as Partial<Event> });
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
  const initializeForm = useCallback(() => {
    if (eventDetails) {
      form.reset({
        eventAddress: eventDetails.eventAddress,
        eventDescription: eventDetails.eventDescription,
        organizerPlan: eventDetails.organizerPlan,
        eventLocation: eventDetails.eventLocation,
        eventPrice: (eventDetails.eventPrice + '') as unknown as number,
        eventName: eventDetails.eventName,
        // eventCategory: eventDetails.eventCategory.map((c) => c._id),
        eventPlace: eventDetails.eventPlace,
        ticketEventLink: eventDetails.ticketEventLink,
        organizerName: eventDetails.organizerName,
        organizationName: eventDetails.organizationName,
        organizationPhoneNumber: eventDetails.organizationPhoneNumber,
        organizationEmail: eventDetails.organizationEmail,
        organizationWebsite: eventDetails.organizationWebsite,
        eventDate: formatDate(eventDetails.eventDate),
        eventStartTime: formatDate(
          eventDetails.eventStartTime,
          'YYYY-mm-ddTHH:MM',
        ),
        eventEndTime: formatDate(eventDetails.eventEndTime, 'YYYY-mm-ddTHH:MM'),
      });
      setImage(eventDetails?.eventImage ?? null);
    }
  }, [eventDetails, form]);
  const resetForm = useCallback(() => {
    form.reset({
      eventAddress: '',
      eventDescription: '',
      organizerPlan: 'free',
      eventLocation: '',
      eventPrice: 0,
      eventName: '',
      // eventCategory: [],
      eventPlace: '',
      ticketEventLink: '',
      organizerName: '',
      organizationName: '',
      organizationPhoneNumber: '',
      organizationEmail: '',
      organizationWebsite: '',
      eventDate: formatDate(new Date().toString()),
      eventStartTime: formatDate(new Date().toISOString(), 'YYYY-mm-ddTHH:MM'),
      eventEndTime: formatDate(new Date().toISOString(), 'YYYY-mm-ddTHH:MM'),
    });
    setImage(null);
  }, [form]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  return (
    <PageContent
      className={cn({
        'animate-pulse duration-1000': isLoading,
      })}
    >
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Update Event</PageTitle>
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
          <PageDescription>Update the event details below</PageDescription>
        </div>
        <div className="item flex flex-col gap-2 md:flex-row">
          <Button
            onClick={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              initializeForm();
            }}
            variant={'secondary'}
          >
            Discard
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              resetForm();
            }}
            variant={'outline'}
          >
            Clear form
          </Button>
        </div>
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

export default UpdateEvent;
