import { z } from 'zod';

export const FORM_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
interface FormFieldType extends React.HTMLProps<HTMLInputElement> {
  name: keyof z.infer<typeof FORM_SCHEMA>;
}
export const FORM_FIELDS: FormFieldType[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    type: 'email',
  },
  {
    name: 'password',
    label: 'password',
    placeholder: '',
    type: 'password',
  },
];
