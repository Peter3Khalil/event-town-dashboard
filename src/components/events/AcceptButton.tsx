import {
  CustomDialog,
  CustomDialogContent,
  CustomDialogFooter,
  CustomDialogHeader,
  CustomDialogTitle,
  CustomDialogTrigger,
} from '@/components/shared/CustomDialog';
import { CheckIcon, LoaderIcon } from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import EventsApi from '@/services/EventsApi';
import { Event } from '@/types/event.types';
import { ResponseError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { z } from 'zod';

const formSchema = z.object({
  expirePlanDate: z.string().refine((date) => {
    return new Date(date) instanceof Date && !isNaN(new Date(date).getTime());
  }),
});

interface AcceptButtonProps extends React.ComponentProps<typeof Button> {
  event: Event;
}

const AcceptButton: FC<AcceptButtonProps> = ({ event, ...props }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading } = useMutation(EventsApi.accept, {
    onSuccess: () => {
      setOpen(false);
    },
    onError: (error) => {
      const err = error as AxiosError<ResponseError>;

      if (err.response?.data.message) {
        form.setError('expirePlanDate', {
          message: err.response.data.message,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('events');
    },
  });
  const handleAccept = useCallback(() => {
    if (event.organizerPlan === 'free') {
      mutate({ id: event._id });
    }
  }, [event._id, event.organizerPlan, mutate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ id: event._id, expirePlanDate: values.expirePlanDate });
  }

  useEffect(() => {
    if (open) {
      form.reset({ expirePlanDate: formatDate(new Date().toString()) });
    }
  }, [form, open]);

  if (event.organizerPlan === 'free') {
    return (
      <MyTooltip content="Accept" className="text-xs">
        <Button
          variant={'secondary'}
          onClick={handleAccept}
          disabled={isLoading}
          className="h-auto p-1"
          {...props}
        >
          {isLoading ? (
            <LoaderIcon size={16} className="animate-spin" />
          ) : (
            <CheckIcon size={16} />
          )}{' '}
        </Button>
      </MyTooltip>
    );
  }

  return (
    <CustomDialog open={open} onOpenChange={setOpen}>
      <CustomDialogTrigger>
        <MyTooltip content="Accept" className="text-xs">
          <Button
            variant={'secondary'}
            // onClick={handleAccept}
            disabled={isLoading}
            className="h-auto p-1"
            {...props}
          >
            {isLoading ? (
              <LoaderIcon size={16} className="animate-spin" />
            ) : (
              <CheckIcon size={16} />
            )}
          </Button>
        </MyTooltip>
      </CustomDialogTrigger>
      <CustomDialogContent className="sm:max-w-[425px]">
        <CustomDialogHeader>
          <CustomDialogTitle className="capitalize">
            Expire date of Plan
          </CustomDialogTitle>
        </CustomDialogHeader>
        <Form {...form}>
          <form className="p-4">
            <FormField
              control={form.control}
              name="expirePlanDate"
              defaultValue={form.formState.defaultValues?.expirePlanDate}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expire Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      min={formatDate(new Date().toString())}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <CustomDialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? 'Accepting...' : 'Accept'}
          </Button>
        </CustomDialogFooter>
      </CustomDialogContent>
    </CustomDialog>
  );
};

export default AcceptButton;
