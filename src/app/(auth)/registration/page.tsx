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

const Registration = () => {
  const [UserName,setUserName] = useState('');
  const [Password,setPassword] = useState('');
  const [Address,setAddress] =useState('');
  const[Email,setEmail] = useState('');
   const [PhoneNumber,setPhoneNumber] = useState()

  const [issubmitting,setissubmitting] = useState(false);
  const router = useRouter();
  //zod
  const form = useForm({
    resolver:zodResolver(Registrations),
    defaultValues:{
      UserName:"",
      Email:"",
      Password:"",
      Address:"",
      PhoneNumber:""

    }
  })

  const onSubmit =  async (data:any)=>{
    console.log(data);
    
    setissubmitting(true)
    try {
     const response =  await axios.post<ApiResponse>('/api/users/register',data);
      console.log(response);
    toast.success("User Created Scussfully");

    router.replace(`/verify/${UserName}`)
    console.log(UserName);
    
  setissubmitting(false)
     
    } catch (error) {
      console.log("error in sign up",error);
      toast.error("Some thing went wrong")
      
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
          name="UserName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter The UserName" {...field} 
                onChange={(e)=>{
                  field.onChange(e)
                  setUserName(e.target.value);
                }}
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
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} 
                
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
          name="PhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PhoneNumber</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type='number' {...field} 
          
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
          name="Address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="shadcn"  {...field} 
          
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
            ):('Register')
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
