import { EVENT_SCHEMA } from '@/constants/formSchemas';
import { isSameDate } from '@/lib/utils';
import { z } from 'zod';

export const isStartTimeSmallerThanEndTime = (
  data: Partial<z.infer<typeof EVENT_SCHEMA>>,
) => {
  if (!data.eventStartTime || !data.eventEndTime) {
    return false;
  }

  return (
    new Date(data.eventStartTime).getTime() <
    new Date(data.eventEndTime).getTime()
  );
};

export const isStartTimeAndStartDateTheSame = (
  data: Partial<z.infer<typeof EVENT_SCHEMA>>,
) => {
  if (!data.eventStartTime || !data.eventDate) {
    return false;
  }

  return isSameDate(data.eventDate, data.eventStartTime);
};
