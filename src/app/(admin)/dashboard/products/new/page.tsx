'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchemaType } from '@/app/validation/newproduct'; // Import the schema and type
import Inputs from '@/components/FormInputs/Input'; // Adjust the path as needed
import TextArea from '@/components/FormInputs/TextArea';
import ImageInput from '@/components/FormInputs/Image';
import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import toast from 'react-hot-toast';

const MyForm: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [issubmitting,setissubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    data.imageUrls = imageUrls
    console.log(data);

    setissubmitting(true)
    try {
     const response =  await axios.post<ApiResponse>('/api/productupload',data);
      console.log(response);
    toast.success("Producted Updated Scussfully");

    
  setissubmitting(false)
     
    } catch (error) {
      console.log("error in sign up",error);
      toast.error("Some thing went wrong")
      
    }

    
  };

  return (
    <div className="bg-white h-full rounded-md p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-3 Mobile:grid Mobile:grid-cols-1">
          <Inputs
            name="Title"
            label="Title"
            className="my-custom-class"
            type="text"
            register={register}
            error={errors.Title?.message}
          />
          <Inputs
            name="Price"
            label="Price"
            className="my-custom-class"
            type="number"
            register={register}
            error={errors.Price?.message}
          />
          <Inputs
            name="SellingPrice"
            label="Selling Price"
            className="my-custom-class"
            type="number"
            register={register}
            error={errors.SellingPrice?.message}
          />
          <Inputs
            name="DealerPrice"
            label="Dealer Price"
            className="my-custom-class"
            type="number"
            register={register}
            error={errors.DealerPrice?.message}
          />
        </div>
        <ImageInput
          name="UploadProductImages"
          label="Upload Product Images"
          endpoint="ProductimageUploader"
          className="w-full"
          SetImageUrls={setImageUrls}
          imageUrls={imageUrls}
          register={register}
        />
        <TextArea
          name="Description"
          error={errors.Description?.message}
          label="Description"
          className=""
          register={register}
        />
        <div>
          <button className="bg-green-500 px-4 py-2 mt-6 text-white" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
