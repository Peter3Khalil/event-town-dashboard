import FormLayout from '@/components/layouts/FormLayout';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormInput } from '@/types/global.types';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type OrganizerFormProps<T extends FieldValues> =
  React.HTMLAttributes<HTMLFormElement> & {
    form: UseFormReturn<T>;
    profileImg?: File | null | string;
    formInputs?: FormInput[];
    // eslint-disable-next-line no-unused-vars
    setProfileImg?: (file: File | null | string) => void;
  };

const OrganizerForm = <T extends FieldValues>({
  form,
  formInputs = [],
  className,
  ...props
}: OrganizerFormProps<T>) => {
  return (
    <Form {...form}>
      <form className={cn('px-2', className)} {...props}>
        <FormLayout>
          {formInputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{input.label}</FormLabel>
                  <FormControl>
                    <Input {...input} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </FormLayout>
      </form>
    </Form>
  );
};

export default OrganizerForm;
