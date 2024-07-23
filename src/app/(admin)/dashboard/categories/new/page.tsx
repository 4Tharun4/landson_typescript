'use client'
import { formSchema, FormSchemaType } from '@/app/validation/CategoryValidaion'
import ImageInput from '@/components/FormInputs/Image'
import Inputs from '@/components/FormInputs/Input'
import Dailogbox from '@/components/models/Dailogbox'
import { Button } from '@/components/ui/button'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const AddCategory = () => {
    const[isDialogOpen,setIsDialogOpen] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [issubmitting,setissubmitting] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema)
    });

    const onSubmit :SubmitHandler<FormSchemaType> = async (data:any) => {
      data.imageUrls = imageUrls;

    setissubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(`/api/category`, data);
    
      if (response.status >= 200 && response.status < 300) {
        reset(); // Reset the form fields
        setImageUrls([]); // Reset the image URLs
        toast.success('New Category created successfully');
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.log("Error in product upload", error);
      toast.error("Something went wrong");
    } finally {
      setissubmitting(false);
    }
    }
  return (
    
    <div className='w-full'>
      <Dailogbox
          title="Add New Category"
          triger="Add Category "
          desc=''
          open={isDialogOpen}
          setOpen={setIsDialogOpen} // Use correct prop name
          BtnText="Cancel"
          onclick={() => setIsDialogOpen(false)} // Example onClick handler
        >
         <div className="bg-white h-full rounded-md p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <Inputs
            name="name"
            label="Title"
            className="my-custom-class  w-full"
            type="text"
            register={register}
            error={errors.name?.message}
          />
          <ImageInput
          name="UploadProductImages"
          label="Upload Category Image"
          endpoint="ProductimageUploader"
          className="w-full"
          SetImageUrls={setImageUrls}
          imageUrls={imageUrls}
          register={register}
        />
          
          </div>
          <div>
          <Button className="bg-green-500 px-4 py-2 mt-6 w-full text-white" type="submit">Submit</Button>
        </div>
          </form></div>
        </Dailogbox>
    </div>
  )
}

export default AddCategory
