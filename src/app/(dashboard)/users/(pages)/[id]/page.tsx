'use client';
import MyImage from '@/components/shared/MyImage';
import useCustomQuery from '@/hooks/useCustomQuery';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import UsersApi from '@/services/UsersApi';
import { FC } from 'react';

interface UserDetailsProps {
  params: {
    id: string;
  };
}

const UserDetails: FC<UserDetailsProps> = ({ params: { id } }) => {
  const { data, isError, isLoading } = useCustomQuery(['user', id], () =>
    UsersApi.getOne(id),
  );
  const user = data?.data.data;
  useSetBreadcrumb({
    breadcrumbPath: '/dashboard/users/user details',
  });
  const image = 'https://picsum.photos/500/500';
  if (isError) return <div>Failed to load user</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex gap-14 py-4">
      <section className="flex w-[300px] flex-col items-center gap-4">
        <figure className="rounded-full shadow-md">
          <MyImage
            src={image}
            height={500}
            width={500}
            alt={user?.name || 'User image'}
            className="size-[300px]"
          />
        </figure>
        <figcaption className="flex flex-col text-center">
          <span className="text-2xl font-bold leading-none">{user?.name}</span>
          <span>{user?.role}</span>
        </figcaption>
        <div className="text-center text-sm text-muted-foreground">
          <p>{user?.email}</p>
          <p>{user?.location.toUpperCase()}</p>
          <p>{user?.phone}</p>
        </div>
      </section>
      <section className="flex-1">
        <div className="flex h-14 w-full items-center justify-center gap-2 bg-accent px-4">
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
          <div className="h-8 w-[100px] rounded bg-background"></div>
        </div>
        <ul>
          {user?.interests.map((interest) => (
            <li key={interest._id}>{interest.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UserDetails;
