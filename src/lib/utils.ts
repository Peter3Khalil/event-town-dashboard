import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

export const isClient = () => typeof window !== 'undefined';

export const Capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (
  date: string,
  matcher: string = 'YYYY-mm-dd',
): string => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date format');
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  // Replace placeholders in the matcher string with actual date values
  const formattedDate = matcher
    .replace('YYYY', String(year))
    .replace('mm', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('MM', minutes)
    .replace('ss', seconds);

  return formattedDate;
};
