'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/features/auth';
import useMutate from '@/hooks/useMutate';
import { useEffect } from 'react';

function Login() {
  const { error, mutate, loading } = useMutate(login);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const res = await mutate({ email, password });
    if (res) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.replace('/dashboard');
    }
  };
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {!!error && (
          <p className="mx-auto text-destructive">Invalid Email or password</p>
        )}
      </CardFooter>
    </Card>
  );
}
export default Login;
