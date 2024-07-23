import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadDropzone } from '@/lib/uploadthing';
import { UseFormRegister } from 'react-hook-form';
import Image from 'next/image';

interface ImageInputProps {
  name: string;
  label: string;
  endpoint: string;
  className?: string;
  SetImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  imageUrls: string[];
  register: UseFormRegister<any>;
}

const ImageInput: React.FC<ImageInputProps> = ({ name, label, endpoint, className, SetImageUrls, imageUrls, register }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file selection
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
   
  });

  return (
    <div className={className}>
      <label>{label}</label>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} {...register(name)} />
      </div>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const urls = res.map(file => file.url);
          SetImageUrls((prev) => [...prev, ...urls]);
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <div className=" flex gap-4 mt-4    mb-5 overflow-x-auto">
      {imageUrls.map((url, i) => (
        // <img key={index} src={url} alt={`uploaded-${index}`} className="uploaded-image" />
       
         
        <div className="uploaded-image " key={i}>
          <Image src={url}  alt={`upload-${i}`} width={100} height={100} className=' w-full overflow-x-auto h-32 rounded-lg shadow-lg  '/> 
          </div>
          
      
      ))}
      </div>
    </div>
  );
};

export default ImageInput;
