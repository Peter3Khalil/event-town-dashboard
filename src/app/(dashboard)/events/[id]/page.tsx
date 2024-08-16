'use client';
import FormLayout from '@/components/layouts/FormLayout';
import {
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import CardSkeleton from '@/components/shared/CardSkeleton';
import { EditIcon } from '@/components/shared/Icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import useCustomQuery from '@/hooks/useCustomQuery';
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { formatDate, formatDateTime } from '@/lib/utils';
import { PLAN_BADGES } from '@/providers/events/events-table-provider';
import EventsApi from '@/services/EventsApi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
type EventDetailsProps = {
  params: {
    id: string;
  };
};

const EventDetails: FC<EventDetailsProps> = ({ params: { id } }) => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/Event Details' });
  const { data, isError, isLoading } = useCustomQuery(
    ['eventDetails', id],
    () => EventsApi.getOne(id),
    {
      cacheTime: 0,
    },
  );
  const event = data?.data.data;
  usePageTitle(event?.eventName || 'Event Details');

  if (isError) notFound();
  if (!event || isLoading)
    return (
      <PageContent>
        <Skeleton className="h-8 w-52 shrink-0" />
        <ScrollArea>
          <FormLayout className="mt-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </FormLayout>
        </ScrollArea>
      </PageContent>
    );
  return (
    <PageContent>
      <PageHeader>
        <div className="flex items-center gap-2">
          <PageTitle>{event.eventName}</PageTitle>
          <Link href={`/events/update/${id}`}>
            <EditIcon />
          </Link>
        </div>
      </PageHeader>
      <ScrollArea>
        {event.eventImage && (
          <div className="relative mb-10 h-64 w-full rounded-lg md:mx-auto md:w-[80%] lg:w-[70%]">
            <Image
              src={event.eventImage}
              fill
              alt={event.eventName}
              className="absolute h-full w-full rounded-lg object-contain object-center"
            />
          </div>
        )}
        <FormLayout className="mt-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoContainer>
                <Key>Price:</Key>
                <p>{event.eventPrice}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Ticket Link:</Key>
                <a href={event.ticketEventLink} className="underline">
                  Link
                </a>
              </InfoContainer>
              <InfoContainer>
                <Key>Status:</Key>
                <p className="capitalize">{event.eventStatus}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Going Users:</Key>
                <p className="capitalize">{event.numberOfGoingUsers}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Created At:</Key>
                <p className="capitalize">
                  {formatDate(event.createdAt, 'YYYY-mm-dd')}
                </p>
              </InfoContainer>
              {event.eventCategory.length > 0 && (
                <div className="flex flex-col gap-2 md:flex-row">
                  <Key>Categories:</Key>
                  <ul className="flex flex-wrap gap-2">
                    {event.eventCategory.map((category, i) => (
                      <li key={i}>
                        <Badge
                          variant={'secondary'}
                          className="text-xs font-normal"
                        >
                          {category.title}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoContainer>
                <Key>organizer Name:</Key>
                <p className="capitalize">{event.organizerName}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>organization Name:</Key>
                <p className="capitalize">{event.organizationName}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Phone:</Key>
                <p className="capitalize">{event.organizationPhoneNumber}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Email:</Key>
                <a
                  className="capitalize underline"
                  href={event.organizationEmail}
                >
                  {event.organizationEmail}
                </a>
              </InfoContainer>
              <InfoContainer>
                <Key>Website:</Key>
                <a
                  className="capitalize underline"
                  href={event.organizationWebsite}
                >
                  Link
                </a>
              </InfoContainer>
              <InfoContainer>
                <Key>Plan:</Key>
                {PLAN_BADGES[event.organizerPlan]}
              </InfoContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Date & Location</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <InfoContainer>
                <Key>Start Date:</Key>
                <p>{formatDateTime(event.eventStartTime)}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>End Date:</Key>
                <p>{formatDateTime(event.eventEndTime)}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Location:</Key>
                <p>{event.eventLocation}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Address:</Key>
                <p>{event.eventAddress}</p>
              </InfoContainer>
              <InfoContainer>
                <Key>Place:</Key>
                <p>{event.eventPlace}</p>
              </InfoContainer>
              {event.expirePlanDate && (
                <InfoContainer>
                  <Key>Expire Date:</Key>
                  <p>{formatDateTime(event.expirePlanDate)}</p>
                </InfoContainer>
              )}
            </CardContent>
          </Card>
        </FormLayout>
      </ScrollArea>
    </PageContent>
  );
};

const InfoContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-1">{children}</div>;
};

const Key = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-sm font-semibold capitalize">{children}</span>;
};

export default EventDetails;
