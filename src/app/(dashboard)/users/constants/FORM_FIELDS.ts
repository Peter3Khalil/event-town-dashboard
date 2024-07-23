import { Input } from '@/components/ui/input';
import { z } from 'zod';

export const FORM_SCHEMA = z
  .object({
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
    gender: z.string(),
    role: z.string().optional().default('user'),
    phone: z.string().optional(),
    interests: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

interface FormFieldType extends React.ComponentProps<typeof Input> {
  name: keyof z.infer<typeof FORM_SCHEMA>;
  values?: string[];
  label: string;
}

type FormKeys = keyof z.infer<typeof FORM_SCHEMA>;
type FormFieldsType = Record<FormKeys, FormFieldType>;

export const FORM_FIELDS: FormFieldsType = {
  name: {
    name: 'name',
    type: 'text',
    label: 'name',
    placeholder: 'Peter Pan',
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    type: 'email',
  },
  password: {
    name: 'password',
    label: 'password',
    type: 'password',
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'confirm password',
    type: 'password',
  },
  location: {
    name: 'location',
    type: 'text',
    label: 'Location',
    placeholder: 'Cairo, Egypt',
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    type: 'text',
  },
  gender: {
    name: 'gender',
    label: 'gender',
    type: 'select',
    values: ['male', 'female'],
  },
  interests: {
    name: 'interests',
    label: 'Interests',
    type: 'text',
  },
  role: {
    name: 'role',
    label: 'Role',
    type: 'select',
    values: ['user', 'admin'],
  },
};
