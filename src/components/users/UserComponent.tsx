import MyImage from '@/components/shared/MyImage';
import RecordComponent from '@/components/shared/RecordComponent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from '@/types/users.types';
import Link from 'next/link';
import React, { FC } from 'react';

interface UserComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

const UserComponent: FC<UserComponentProps> = ({
  user,
  className,
  ...props
}) => {
  const image = user.profileImg || '';
  return (
    <div className={cn('flex w-full items-center gap-3', className)} {...props}>
      <MyImage src={image} alt={user.name} width={50} height={50} />
      <div className="flex flex-col overflow-hidden text-ellipsis text-xs">
        <Button
          variant={'link'}
          className="size-auto items-start justify-start p-0"
        >
          <span className="overflow-hidden text-ellipsis font-semibold">
            <Link href={`/users/${user._id}`} className="capitalize">
              {user.name}
            </Link>
          </span>
        </Button>
        <RecordComponent label="Email" value={user.email} />
        <RecordComponent label="location" value={user.location.toUpperCase()} />
        <RecordComponent label="phone" value={user.phone} />
      </div>
    </div>
  );
};

export default UserComponent;
