'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormSchemaType } from '@/app/validation/newproduct'; // Import the schema and type
import Inputs from '@/components/FormInputs/Input'; // Adjust the path as needed
import TextArea from '@/components/FormInputs/TextArea';
import ImageInput from '@/components/FormInputs/Image';
import { ApiResponse } from '@/types/ApiResponse';
import axios from 'axios';


import toast from 'react-hot-toast';
import Select from '@/components/FormInputs/Select';

const MyForm: React.FC =  () => {

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/category');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        Setcategory(data);
        
      } catch (error) {
        console.error("Error fetching users:", error);
        
      } finally {
      
      }
    };

    fetchUsers();
  }, []);




 const types =[
  {
    id:1,
    name:"Product"
  },
  {
    id:2,
    name:"Spares"
  },
  
 ] 

 const[categories,Setcategory] = useState([]);


 
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [issubmitting,setissubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
   
    
    data.imageUrls = imageUrls;

    setissubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(`/api/productupload`, data);
      console.log("Response:", response);
      if (response.status >= 200 && response.status < 300) {
        reset(); // Reset the form fields
        setImageUrls([]); // Reset the image URLs
        toast.success('Product uploaded successfully');
      }
    } catch (error) {
      console.log("Error in product upload", error);
      toast.error("Something went wrong");
    } finally {
      setissubmitting(false);
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
          <Select name='Type' label='Select Product Type' register={register} data={types} className=''/>
          <Select name='category' label='Select Category Type' register={register} data={categories} className=''/>
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
