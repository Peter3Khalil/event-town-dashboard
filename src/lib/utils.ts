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

export const isValidDate = (date: Date | string) => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

export const formatDate = (
  date: string | Date,
  matcher: 'YYYY-mm-ddTHH:MM' | 'YYYY-mm-dd' = 'YYYY-mm-dd',
): string => {
  const dateObj = new Date(date);

  if (!isValidDate(dateObj)) {
    return 'Invalid date format';
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

export const isInFuture = (date: Date | string) => {
  if (!isValidDate(date)) {
    return 'Invalid date format';
  }

  return new Date(date).getTime() > Date.now();
};

export const isSameDate = (date1: Date | string, date2: Date | string) => {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  if (!isValidDate(firstDate) || !isValidDate(secondDate)) {
    return 'Invalid date format';
  }

  return firstDate.toDateString() === secondDate.toDateString();
};

export const maxDate = (dates: (Date | string)[]) => {
  const dateObjects = dates.map((date) => new Date(date));

  if (dateObjects.some((date) => !isValidDate(date))) {
    return 'Invalid date format';
  }

  return new Date(Math.max(...dateObjects.map((date) => date.getTime())));
};

export const minDate = (...dates: (Date | string)[]) => {
  const dateObjects = dates.map((date) => new Date(date));

  if (dateObjects.some((date) => !isValidDate(date))) {
    return 'Invalid date format';
  }

  return new Date(Math.min(...dateObjects.map((date) => date.getTime())));
};

export const getNextDay = (date?: Date | string) => {
  if (!date) {
    return new Date(new Date().setDate(new Date().getDate() + 1));
  }

  const dateObj = new Date(date);

  if (!isValidDate(dateObj)) {
    return 'Invalid date format';
  }

  return new Date(dateObj.setDate(dateObj.getDate() + 1));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appendFormData = (key: string, value: any): void => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        appendFormData(`${key}[${subKey}]`, subValue);
      });
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  };

  Object.entries(obj).forEach(([key, value]) => appendFormData(key, value));

  return formData;
};
