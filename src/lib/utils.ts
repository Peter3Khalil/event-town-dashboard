import { Toast, ToasterToast } from '@/components/ui/use-toast';
import { isAxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

export const toastError = (
  error: unknown,
  // eslint-disable-next-line no-unused-vars
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    // eslint-disable-next-line no-unused-vars
    update: (props: ToasterToast) => void;
  },
) => {
  if (isAxiosError(error)) {
    return toast({
      title: 'Error',
      description: error.response?.data.message,
    });
  }

  toast({
    title: 'Error',
    description: 'An error occurred while rejecting the event',
  });
};

export const isClient = () => typeof window !== 'undefined';

export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
