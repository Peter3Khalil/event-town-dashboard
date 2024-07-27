/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FORM_FIELDS,
  FormFieldType,
} from '@/app/(dashboard)/users/constants/FORM_FIELDS';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ImageUploader from '@/components/shared/ImageUploader';
import { useCategories } from '@/providers/categories/categories-provider';
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import FormLayout from '@/components/layouts/FormLayout';

const defaultFormFields = Object.entries(FORM_FIELDS)
  .map(([, value]) => {
    return value;
  })
  .filter((field) =>
    [
      'name',
      'email',
      'password',
      'confirmPassword',
      'location',
      'phone',
    ].includes(field.name),
  );

type UserFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  profileImg: File | null | string;
  formFields?: FormFieldType[];
  // eslint-disable-next-line no-unused-vars
  setProfileImg: (file: File | null | string) => void;
};

const UserForm = <T extends FieldValues>({
  form,
  profileImg,
  formFields = defaultFormFields,
  setProfileImg,
}: UserFormProps<T>) => {
  const {
    queryResult: { data, isLoading: isLoadingCategories },
  } = useCategories();
  const categories = data?.data.data;

  return (
    <Form {...form}>
      <form className="px-2">
        <ImageUploader image={profileImg} setImage={setProfileImg} />
        <FormLayout>
          {formFields.map((input, index) => (
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Label>Role</Label>
              <Controller
                name={'role' as Path<T>}
                control={form.control}
                defaultValue={
                  (form.getValues('role' as Path<T>) as PathValue<
                    T,
                    Path<T>
                  >) || ('user' as PathValue<T, Path<T>>)
                }
                render={({ field }) => (
                  <Select
                    defaultValue="user"
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Gender</Label>
              <Controller
                name={'gender' as Path<T>}
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex"
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        checked={field.value === 'male'}
                        value="male"
                        id="r1"
                      />
                      <Label htmlFor="r1">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        checked={field.value === 'female'}
                        value="female"
                        id="r2"
                      />
                      <Label htmlFor="r2">Female</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label>Interests</Label>
            <Separator className="h-[0.5px]" />
            {isLoadingCategories ? (
              <p>Loading...</p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-4 px-2">
                <Controller
                  name={'interests' as Path<T>}
                  control={form.control}
                  render={({ field }) => (
                    <>
                      {categories?.map((category, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Checkbox
                            id={category._id}
                            checked={field.value?.includes(category._id)}
                            onCheckedChange={(checked) => {
                              const values = field.value || [];

                              if (checked) {
                                field.onChange([...values, category._id]);
                              } else {
                                field.onChange(
                                  values.filter(
                                    (value) => value !== category._id,
                                  ),
                                );
                              }
                            }}
                          />
                          <Label htmlFor={category._id} className="text-xs">
                            {category.title}
                          </Label>
                        </li>
                      ))}
                    </>
                  )}
                />
              </ul>
            )}
          </div>
        </FormLayout>
      </form>
    </Form>
  );
};

export default UserForm;
