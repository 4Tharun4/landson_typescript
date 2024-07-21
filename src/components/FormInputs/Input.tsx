import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type IProps = {
  name: string;
  label: string;
  className: string;
  type:string;
  register: UseFormRegister<any>; // Correctly typing the register prop
};

const Inputs: React.FC<IProps> = ({ name, label, className, register,type }) => {
  return (
    <div className={className}>
      <label htmlFor={name}>
        <input {...register(name)}  type={type}  placeholder={label}  className={`${className} px-5  bg-white border-2  h-10 outline focus:outline  rounded-md `}/>
      </label>
    </div>
  );
};

export default Inputs;
