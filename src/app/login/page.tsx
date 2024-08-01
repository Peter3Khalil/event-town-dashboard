'use client';

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
import { LOGIN_SCHEMA } from '@/constants/formSchemas';
import UsersApi from '@/services/UsersApi';
import { FormInput, ResponseError } from '@/types/global.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { z } from 'zod';

type LoginFormInput = FormInput & {
  name: keyof z.infer<typeof LOGIN_SCHEMA>;
};

function Login() {
  const form = useForm<z.infer<typeof LOGIN_SCHEMA>>({
    resolver: zodResolver(LOGIN_SCHEMA),
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

  const onSubmit = (values: z.infer<typeof LOGIN_SCHEMA>) => {
    mutate({ ...values });
  };

  const formInputs: LoginFormInput[] = useMemo(
    () => [
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
    ],
    [],
  );

  useEffect(() => {
    localStorage.removeItem('token');
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
            {formInputs.map((input) => (
              <FormField
                key={input.name}
                control={form.control}
                name={input.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{input.label}</FormLabel>
                    <FormControl>
                      <Input {...input} {...field} />
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
