import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.'
    })
    .email({ message: 'Invalid email address.' }),
  password: z
    .string({
      required_error: 'Password is required.'
    })
    .min(6, {
      message: 'Invalid password.'
    })
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(values: LoginSchema) {
    supabase.auth
      .signInWithPassword({
        email: values.email,
        password: values.password
      })
      .then((res) => console.log(res));
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full min-w-sm max-w-md px-10 py-6">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-center gap-2 text-sm">
              <span className="text-muted-foreground">New user?</span>
              <span>Register</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
