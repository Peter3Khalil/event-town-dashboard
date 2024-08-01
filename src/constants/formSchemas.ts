import { z } from 'zod';

export const EVENT_SCHEMA = z
  .object({
    organizerName: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must be at most 30 characters long'),
    organizationName: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must be at most 30 characters long'),
    organizationPhoneNumber: z.string(),
    organizationEmail: z.string().email().optional(),
    organizationWebsite: z.string().url().optional(),
    organizerPlan: z
      .enum(['free', 'basic', 'standard', 'premium'])
      .default('free'),
    eventName: z
      .string()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name must be at most 30 characters long'),
    eventAddress: z.string().optional(),
    eventCategory: z.array(z.string()).refine((val) => val.length > 0, {
      message: 'Please select at least one category',
    }),
    eventDate: z.string(),
    eventStartTime: z
      .string()
      .transform((val) => (val.length > 0 ? new Date(val).toISOString() : '')),
    eventEndTime: z
      .string()
      .transform((val) => (val.length > 0 ? new Date(val).toISOString() : '')),
    eventLocation: z.string(),
    ticketEventLink: z.string().url(),
    eventPrice: z
      .string()
      .refine((val) => parseFloat(val) > 0 && val.length > 0, {
        message: 'Price must be a positive number',
      })
      .transform((val) => parseFloat(val)),
    eventDescription: z.string().optional(),
    eventPlace: z.string().optional(),
  })
  .refine(
    (data) =>
      new Date(data.eventStartTime).getTime() <
      new Date(data.eventEndTime).getTime(),
    {
      message: 'Event end time must be after event start time',
      path: ['eventEndTime'],
    },
  );

export const USER_SCHEMA = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Confirm Password must be at least 8 characters long'),
  location: z
    .string()
    .min(3, 'Location must be at least 3 characters long')
    .max(50, 'Location must be at most 50 characters long'),
  gender: z.string().default('male'),
  role: z.string().optional().default('user'),
  phone: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password must be at least 1 character long'),
});
