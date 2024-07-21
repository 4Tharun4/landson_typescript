'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as  z  from "zod"
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Registrations } from '@/app/validation/registration'
import { ApiResponse } from '@/types/ApiResponse'
import toast, { Toaster } from 'react-hot-toast';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Login } from '@/app/validation/login'
import { signIn } from 'next-auth/react'

const Registration = () => {
  const [issubmitting,setissubmitting] = useState(false);
  const router = useRouter();
  //zod
  const form = useForm({
    resolver:zodResolver(Login),
    defaultValues:{
      Identifier:"",
      Password:"",
    }
  })

  const onSubmit =  async (data:any)=>{
  const result  = await signIn("credentials",{
    Identifier:data.Identifier,
    password:data.Password
  })
  console.log(result);

  if(result?.ok){
    alert("you achived");
  }
  



  

   

  }
  return (
    <div className=' flex justify-center  w-full items-center h-dvh '>
      <div className=" w-[50%]  max-h-full rounded-lg bg-green-400">
<div className=" px-4 py-4 ">
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
      
        <FormField
          control={form.control}
          name="Identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter The UserName" {...field} 
                
                />
              </FormControl>
              <FormDescription>
              
              </FormDescription>
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
                <Input placeholder="shadcn" type='password' {...field} 
               
                />
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
            
         
        <Button type="submit" disabled={issubmitting}>
          
          {
            issubmitting?(
              <>
            Please Wait
              </>
            ):('Login')
          }
        </Button>
      </form>
    </Form>
    </div>
    </div>
    </div>
  )
}

export default Registration
