'use client'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import { Login } from '@/app/validation/login';
import { signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

const Registration = () => {
  const [issubmitting, setissubmitting] = useState(false);
  const router = useRouter();

  //zod
  const form = useForm({
    resolver: zodResolver(Login),
    defaultValues: {
      Identifier: "",
      Password: "",
    }
  });

  const onSubmit = async (data:any) => {
    setissubmitting(true);
    const result = await signIn("credentials", {
      Identifier: data.Identifier,
      password: data.Password,
      redirect: false,
    });
    setissubmitting(false);

    if (result?.ok) {
      // Fetch the session to get user details
      const session = await getSession();
      const user = session?.user;

      // Check the user's role and redirect accordingly
      if (user) {
        if (user.role === 'ADMIN') {
          router.push('/dashboard');
        } else if (user.role === 'DEALER') {
          router.push('/dealer');

        }else if(user.role === 'WHEREHOUSE'){
          router.push('/wherehouse')

        } else if(user.role ==='DEVELOPER'){
          router.push('/developer/dashboard')
        }
        else  {
          router.push('/'); // default redirection
        }
      }
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className='flex justify-center w-full items-center h-dvh'>
      <div className="w-[50%] max-h-full rounded-lg bg-green-400">
        <div className="px-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="Identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter The UserName" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type='password' {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex  justify-between">
              <Button type="submit" disabled={issubmitting}>
                {issubmitting ? 'Please Wait' : 'Login'}
              </Button>
              <p> If you are new please register</p>
             <Link href={'/registration'} ><Button >Register
              </Button></Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
