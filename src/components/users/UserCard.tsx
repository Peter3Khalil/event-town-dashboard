import {
  AlertIcon,
  CheckIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from '@/components/shared/Icons';
import MyImage from '@/components/shared/MyImage';
import MyTooltip from '@/components/shared/MyTooltip';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types/users.types';
import { FC } from 'react';

type UserCardProps = {
  user: Omit<User, 'token'>;
};

const UserCard: FC<UserCardProps> = ({ user }) => {
  const image = user?.profileImg || '/defaultUser.jpg';
  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-12">
          <div className="flex flex-col items-center gap-2">
            <MyImage
              src={image}
              alt={user?.name || 'profile Image'}
              className="size-[200px]"
              width={500}
              height={500}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="capitalize">{user?.name}</CardTitle>
              <Badge
                className="uppercase"
                variant={user?.role === 'admin' ? 'default' : 'outline'}
              >
                {user?.role}
              </Badge>
            </div>
            <CardDescription className="mt-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MailIcon size={20} />
                <p>{user?.email}</p>
                {user?.emailVerified ? (
                  <MyTooltip content="Verified Email">
                    <CheckIcon className="text-green-500" size={20} />
                  </MyTooltip>
                ) : (
                  <MyTooltip content="Not Verified Email">
                    <AlertIcon className="text-destructive" size={20} />
                  </MyTooltip>
                )}
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={20} />
                <p>{user?.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <LocationIcon size={20} />
                <p>{user?.location}</p>
              </div>
              <p className="text-xs">
                <span className="font-bold">Gender:</span>{' '}
                <span className="capitalize">{user?.gender}</span>
              </p>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {user && user?.interests.length > 0 && (
          <>
            <h3 className="text-lg font-medium">Interests</h3>
            <Separator className="mb-2" />
            <ul className="flex w-full flex-wrap gap-2">
              {user?.interests.map((interest, index) => (
                <li key={interest._id}>
                  <Badge variant={'secondary'} key={index}>
                    {interest.title}
                  </Badge>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
