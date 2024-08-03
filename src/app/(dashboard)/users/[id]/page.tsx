'use client';
import { PageContent } from '@/components/layouts/PageLayout';
import DeleteButton from '@/components/shared/DeleteButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import UserCard from '@/components/users/UserCard';
import UserSkeletonCard from '@/components/users/UserSkeletonCard';
import useCustomQuery from '@/hooks/useCustomQuery';
import usePageTitle from '@/hooks/usePageTitle';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import UsersApi from '@/services/UsersApi';
import { User } from '@/types/users.types';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface UserDetailsProps {
  params: {
    id: string;
  };
}

const UserDetails: FC<UserDetailsProps> = ({ params: { id } }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useCustomQuery(['userDetails', id], () =>
    UsersApi.getOne(id),
  );
  const user = data?.data.data;
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/user details',
  });

  usePageTitle(user?.name || 'User Details');
  if (isError) notFound();
  return (
    <PageContent className="items-center pb-4">
      {isLoading || !user ? (
        <UserSkeletonCard />
      ) : (
        <>
          <UserCard user={user} />
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/users/update/${user?._id}`}>Update</Link>
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <DeleteButton
                    invalidateKey="users"
                    deleteFunction={UsersApi.delete}
                    onSuccess={() => {
                      setOpen(false);
                      router.push('/users');
                    }}
                    model={user as unknown as User}
                  >
                    Delete
                  </DeleteButton>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </PageContent>
  );
};

export default UserDetails;
