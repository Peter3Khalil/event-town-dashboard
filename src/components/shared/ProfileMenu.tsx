import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon } from '@/components/shared/Icons';
import React, { FC } from 'react';
import { cn } from '@/lib/utils';
import ThemeChanger from '@/components/ThemeChanger';
import { useAuth } from '@/providers/auth-provider';

type ProfileMenuProps = React.ComponentProps<typeof DropdownMenuContent>;

const ProfileMenu: FC<ProfileMenuProps> = ({ className, ...props }) => {
  const { user } = useAuth();
  const name = user?.name;
  const handleLogout = () => {
    window.location.href = '/login';
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            {name.slice(0, 2).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('mx-2', className)} {...props}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeChanger />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="flex gap-2">
          <LogOutIcon size={20} className="shrink-0" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
