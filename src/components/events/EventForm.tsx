'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';

import FormLayout from '@/components/layouts/FormLayout';
import {
  ImagePreview,
  ImageUploader,
  ImageUploaderProvider,
} from '@/components/shared/ImageUploader';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  CategoriesProvider,
  useCategories,
} from '@/providers/categories/categories-provider';
import { FormInput } from '@/types/global.types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Capitalize } from '@/lib/utils';

type EventFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  eventImage: File | null | string;
  formInputs?: FormInput[];
  // eslint-disable-next-line no-unused-vars
  setEventImage: (file: File | null | string) => void;
};

const EventForm = <T extends FieldValues>({
  form,
  eventImage,
  setEventImage,
  formInputs = [],
}: EventFormProps<T>) => {
  const {
    queryResult: { data, isLoading: isLoadingCategories },
  } = useCategories();
  const categories = data?.data.data;
  return (
    <Form {...form}>
      <form className="px-2">
        <ImageUploaderProvider value={eventImage} onImageChange={setEventImage}>
          <ImagePreview />
          <ImageUploader />
        </ImageUploaderProvider>
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
          <div className="flex flex-col gap-1">
            <Label>Plan</Label>
            <Controller
              name={'organizerPlan' as Path<T>}
              control={form.control}
              defaultValue={
                (form.getValues('organizerPlan' as Path<T>) as PathValue<
                  T,
                  Path<T>
                >) || ('free' as PathValue<T, Path<T>>)
              }
              render={({ field }) => (
                <Select
                  defaultValue="free"
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent focus:ring-offset-0">
                    <SelectValue
                      placeholder="Select Role"
                      className="capitalize"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {['free', 'basic', 'standard', 'premium'].map(
                        (plan, index) => (
                          <SelectItem key={index} value={plan}>
                            {Capitalize(plan)}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="flex flex-col gap-1 md:flex-row md:items-center">
              <span> Categories</span>
              {form.formState.errors?.eventCategory && (
                <FormMessage className="text-xs">
                  {
                    form.formState.errors.eventCategory
                      ?.message as unknown as string
                  }
                </FormMessage>
              )}
            </Label>
            <Separator className="h-[0.5px]" />
            {isLoadingCategories ? (
              <p>Loading...</p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-4 px-2">
                <Controller
                  name={'eventCategory' as Path<T>}
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

const Wrapper = <T extends FieldValues>(props: EventFormProps<T>) => {
  return (
    <CategoriesProvider>
      <EventForm {...props} />
    </CategoriesProvider>
  );
};

export default Wrapper;
