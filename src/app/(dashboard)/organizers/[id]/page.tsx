'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  TrashIcon,
} from '@/components/shared/Icons';
import React, { FC, useState } from 'react';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import usePageTitle from '@/hooks/usePageTitle';
import { notFound, useRouter } from 'next/navigation';
import OrganizersApi from '@/services/OrganizersApi';
import useCustomQuery from '@/hooks/useCustomQuery';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import CardSkeleton from '@/components/shared/CardSkeleton';
import { Page, PageContent } from '@/components/layouts/PageLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from '@/components/shared/CustomDialog';
import { Button } from '@/components/ui/button';
import DeleteButton from '@/components/shared/DeleteButton';

type OrganizerDetailsProps = {
  params: {
    id: string;
  };
};

const OrganizerDetails: FC<OrganizerDetailsProps> = ({ params: { id } }) => {
  useSetBreadcrumb({
    breadcrumbPath: 'dashboard/organizers/organizer details',
  });
  const { data, isError, isLoading } = useCustomQuery(
    ['organizerDetails', id],
    () => OrganizersApi.getOne(id),
    {
      cacheTime: 0,
    },
  );
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const organizer = data?.data.data;
  usePageTitle(organizer?.organizerName || 'Organizer Details');

  if (isError) notFound();
  if (!organizer || isLoading)
    return (
      <Page>
        <PageContent>
          <CardSkeleton className="mx-auto mt-4 w-full lg:w-[800px]" />
        </PageContent>
      </Page>
    );
  return (
    <Page>
      <PageContent>
        <ScrollArea>
          <Card className="mx-auto mt-4 w-full lg:w-[800px]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="capitalize">
                  {organizer.organizerName}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Link href={`/organizers/update/${id}`}>
                    <EditIcon />
                  </Link>
                  <CustomDialog open={open} onOpenChange={setOpen}>
                    <CustomDialogTrigger>
                      <TrashIcon className="text-destructive" />
                    </CustomDialogTrigger>
                    <CustomDialogContent>
                      <CustomDialogHeader>
                        <CustomDialogTitle>
                          Are you sure you want to delete this organizer?
                        </CustomDialogTitle>
                        <CustomDialogDescription>
                          This action cannot be undone.
                        </CustomDialogDescription>
                      </CustomDialogHeader>
                      <CustomDialogFooter>
                        <Button
                          variant={'secondary'}
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                        <DeleteButton
                          deleteFunction={OrganizersApi.delete}
                          model={organizer}
                          onSuccess={() => {
                            setOpen(false);
                            router.push('/organizers');
                          }}
                          invalidateKey="organizers"
                        >
                          Delete
                        </DeleteButton>
                      </CustomDialogFooter>
                    </CustomDialogContent>
                  </CustomDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {organizer.advice && (
                <CardDescription className="mb-4 break-before-all break-words">
                  <span className="mr-1 font-medium">Advise:</span>
                  <span className="text-wrap break-words">
                    {organizer.advice}
                  </span>
                </CardDescription>
              )}

              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Organization Name:</span>
                  <span>{organizer.organizationName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Created At:</span>
                  <span>{formatDate(organizer.createdAt)}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Updated At:</span>
                  <span>{formatDate(organizer.updatedAt)}</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Field:</span>
                  <Badge variant={'secondary'}>
                    {organizer.organizationField}
                  </Badge>
                </div>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Website:</span>
                  <a href={organizer.organizationWebsite} className="underline">
                    Link
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MailIcon size={20} />
                  <a href="#" className="underline">
                    {organizer.organizationEmail}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon size={20} />
                  <a
                    className="underline"
                    href={`tel:${organizer.organizationPhoneNumber}`}
                  >
                    {organizer.organizationPhoneNumber}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollArea>
      </PageContent>
    </Page>
  );
};

export default OrganizerDetails;
