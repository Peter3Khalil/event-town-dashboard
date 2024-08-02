import {
  CategoryIcon,
  EventIcon,
  HomeIcon,
  OrganizerIcon,
  UsersIcon,
} from '@/components/shared/Icons';
import { GetAllQueryParams } from '@/types/global.types';
import { LucideIcon } from 'lucide-react';
import { Rubik } from 'next/font/google';

export const BRAND_COLOR = '#f97316';

export const APP_FONT = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['italic', 'normal'],
  fallback: ['sans-serif'],
});

type NavigationItem = {
  readonly href: string;
  readonly icon: LucideIcon;
  readonly name: string;
};
type NavigationsKeys =
  | 'dashboard'
  | 'events'
  | 'users'
  | 'categories'
  | 'organizers';

export const NAVIGATION_ITEMS: Readonly<
  Record<NavigationsKeys, NavigationItem>
> = {
  dashboard: { href: '/dashboard', icon: HomeIcon, name: 'Dashboard' },
  events: { href: '/events', icon: EventIcon, name: 'Events' },
  users: { href: '/users', icon: UsersIcon, name: 'Users' },
  categories: { href: '/categories', icon: CategoryIcon, name: 'Categories' },
  organizers: { href: '/organizers', icon: OrganizerIcon, name: 'Organizers' },
};

export const DEFAULT_QUERY_PARAMS: GetAllQueryParams = {
  limit: 10,
  page: 1,
  keyword: '',
};
