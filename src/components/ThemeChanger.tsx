'use client';

import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { FC, useEffect, useId } from 'react';

type ThemeChangerProps = React.HTMLAttributes<HTMLDivElement>;
const ThemeChanger: FC<ThemeChangerProps> = ({ className, ...props }) => {
  const { setTheme, theme } = useTheme();
  const id = useId();
  useEffect(() => {
    if (theme) localStorage.setItem('theme', theme);
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') as string);
    }
  }, [setTheme, theme]);

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <label htmlFor={id}>Dark Mode</label>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
        className="h-[15px] w-[30px]"
        id={id}
      />
    </div>
  );
};

export default ThemeChanger;
