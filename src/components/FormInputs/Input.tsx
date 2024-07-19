import React from 'react'

type IProps={
    name:string,
    label:string,
    className:string,

}

const Input = (props:IProps) => {
  return (
    <div className={`${props.className}`}>
        <label htmlFor="">{props.label}
            <input type="text" name="" id="" placeholder={props.name} />
        </label>
      
    </div>
  )
}

export default Input
