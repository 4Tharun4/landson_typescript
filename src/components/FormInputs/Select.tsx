import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
  className: string;

  error?:string,
  data:any
  register: UseFormRegister<any>; // Correctly typing the register prop
};

const Select: React.FC<IProps> = ({ name, label, className, register,error ,data}) => {
  return (
    <div className={className}>
      <label className='relative'>
        {label}
        
        <select {...register(name)}   className={`${className} px-4 py-2   w-full text-lg  outline-none  border-2  border-gray-200  rounded  hover:border-blue-600  duration-200  peer focus:border-indigo-600 bg-inherit `} >
        {
    data.map((opt:any,i:any)=>{
        return(
            <option key={i} > 
       {opt.name}
            </option>
        )
    })
}

        </select>
        
        {
    error&&(
      <span className=' text-sm text-red-600'>{error}</span>
    )
  }
      </label>
    </div>
  );
};

export default Select;
