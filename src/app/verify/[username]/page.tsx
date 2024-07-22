'use client'
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyotp } from '@/app/validation/verifyschema'; // Ensure this path is correct
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(verifyotp),
    defaultValues: {
      Code: ''
    }
  });

  const onSubmit = async (data: any) => {
    toast.success("Clicked")
    console.log('Form Data:', data);
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        Code: data.Code
      });

      
      console.log('Response:', response);

      toast.success("Success");
      router.replace('/login');
    } catch (error) {
      console.log("Something Went Wrong", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3 bg-gray-200 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Verify Code</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="Code" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <input
              id="Code"
              type="text"
              placeholder="Enter the verification code"
              {...form.register('Code')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {form.formState.errors.Code && (
              <span className="text-red-600 text-sm">{form.formState.errors.Code.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
