import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
  className: string;
  type: any;
  error?:string,
  register: UseFormRegister<any>; // Correctly typing the register prop
};

const Inputs: React.FC<IProps> = ({ name, label, className, register, type,error }) => {
  return (
    <div className={`${className} `}>
      <label className='relative text-xl font-medium'>{label}
        
        <input {...register(name)} type={type}  className={`${className} px-4 py-2  w-full  text-lg  outline-none  border-2  border-gray-200  rounded  peer-valid:bg-green-500 hover:border-blue-600  duration-200  peer focus:border-indigo-600 bg-inherit `} /> 
        {/* <span className='absolute  left-0 top-3 px-1  text-sm  uppercase  tracking-wide  peer-focus:text-indigo-600 pointer-events-none duration-200  peer-focus:text-[10px]   peer-focus:-translate-y-9  peer-valid:bg-white  peer-valid:-translate-y-10 peer-focus:bg-white    peer-valid:text-sm   ml-2 '>{label}

        </span> */}
        {
    error&&(
      <span className=' text-sm text-red-600'>{error}</span>
    )
  }
      </label>
    </div>
  );
};

export default Inputs;
