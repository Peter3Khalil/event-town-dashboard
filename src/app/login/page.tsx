'use client';

import { FORM_FIELDS, FORM_SCHEMA } from '@/app/login/constants/FORM_FIELDS';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UsersApi from '@/services/UsersApi';
import { ResponseError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

function Login() {
  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const { mutate, isLoading } = useMutation(UsersApi.login, {
    onSuccess(data) {
      localStorage.setItem('token', data.data.token);
      window.location.href = '/dashboard';
      setServerError(null);
    },
    onError(err) {
      const error = err as AxiosError<ResponseError>;

      if (error.response?.data && error.response?.data.message) {
        setServerError(error.response.data.message);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof FORM_SCHEMA>) => {
    mutate({ ...values });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
        {serverError && (
          <CardDescription className="text-destructive">
            {serverError}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            {FORM_FIELDS.map((FORM_FIELD) => (
              <FormField
                key={FORM_FIELD.name}
                control={form.control}
                name={FORM_FIELD.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">
                      {FORM_FIELD.label}
                    </FormLabel>
                    <FormControl>
                      <Input {...FORM_FIELD} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Loading....' : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default Login;
