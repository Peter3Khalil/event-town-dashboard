import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/useMediaQuery';
import React, { ComponentType, FC } from 'react';

type ResponsiveComponentProps<T> = T & {
  children?: React.ReactNode;
};

const withResponsiveComponent = <T extends object>({
  DesktopComponent,
  MobileComponent,
}: {
  DesktopComponent: ComponentType<T>;
  MobileComponent: ComponentType<T>;
}) => {
  const ResponsiveComponent: FC<ResponsiveComponentProps<T>> = ({
    children,
    ...props
  }) => {
    const { isMatched: isDesktop } = useMediaQuery({ minWidth: 768 });
    const Component = isDesktop ? DesktopComponent : MobileComponent;
    return <Component {...(props as T)}>{children}</Component>;
  };
  return ResponsiveComponent;
};

const CustomDialog = withResponsiveComponent<
  React.ComponentProps<typeof Dialog> & React.ComponentProps<typeof Drawer>
>({ DesktopComponent: Dialog, MobileComponent: Drawer });

const CustomDialogTrigger = withResponsiveComponent<
  React.ComponentProps<typeof DialogTrigger> &
    React.ComponentProps<typeof DrawerTrigger>
>({ DesktopComponent: DialogTrigger, MobileComponent: DrawerTrigger });

const CustomDialogContent = withResponsiveComponent<
  React.ComponentProps<typeof DialogContent> &
    React.ComponentProps<typeof DrawerContent>
  //@ts-expect-error - DrawerContent does not have a ref
>(DialogContent, DrawerContent);

const CustomDialogHeader = withResponsiveComponent<
  React.ComponentProps<typeof DialogHeader> &
    React.ComponentProps<typeof DrawerHeader>
>({ DesktopComponent: DialogHeader, MobileComponent: DrawerHeader });

const CustomDialogTitle = withResponsiveComponent<
  React.ComponentProps<typeof DialogTitle> &
    React.ComponentProps<typeof DrawerTitle>
>({ DesktopComponent: DialogTitle, MobileComponent: DrawerTitle });

const CustomDialogDescription = withResponsiveComponent<
  React.ComponentProps<typeof DialogDescription> &
    React.ComponentProps<typeof DrawerDescription>
>({ DesktopComponent: DialogDescription, MobileComponent: DrawerDescription });

const CustomDialogFooter = withResponsiveComponent<
  React.ComponentProps<typeof DialogFooter> &
    React.ComponentProps<typeof DrawerFooter>
>({ DesktopComponent: DialogFooter, MobileComponent: DrawerFooter });

export {
  CustomDialog,
  CustomDialogContent,
  CustomDialogDescription,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
};
