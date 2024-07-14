'use client';

import { MenuIcon } from '@/components/shared/Icons';
import ProfileMenu from '@/components/shared/ProfileMenu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAVIGATION_ITEMS } from '@/constants';
import { cn } from '@/lib/utils';
import { useBreadcrumb } from '@/providers/breadcrumb-provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const MobileHeader = () => {
  const { breadcrumbPage } = useBreadcrumb();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname.includes(href);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b px-6 sm:hidden">
        <div className="flex items-center gap-2">
          <SheetTrigger>
            <MenuIcon className="cursor-pointer" size={20} />
          </SheetTrigger>
          <span className="text-lg font-medium capitalize">
            {breadcrumbPage}
          </span>
        </div>
        <ProfileMenu />
      </header>
      <SheetContent side={'left'}>
        <SheetHeader className="items-start text-start">
          <nav className="relative flex w-full flex-1 flex-col items-start gap-2 bg-background pt-6 text-foreground">
            {Object.entries(NAVIGATION_ITEMS).map(([key, value]) => (
              <Link key={key} href={value.href} className="w-full">
                <div
                  className={cn(
                    'flex w-full items-center rounded p-2 font-medium text-muted-foreground duration-300 hover:bg-accent hover:text-foreground',
                    {
                      'bg-accent text-foreground': isActive(value.href),
                    },
                  )}
                >
                  <value.icon size={24} className={cn('shrink-0')} />
                  <span
                    className={cn('ml-2 text-sm leading-none duration-300')}
                  >
                    {value.name}
                  </span>
                </div>
              </Link>
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
