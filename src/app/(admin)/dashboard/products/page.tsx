'use client'
import Dailogbox from '@/components/models/Dailogbox'
import { Button } from '@react-email/components';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import New from './new/page';
import Link from 'next/link';

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addproduct=()=>{
    alert("Add Product")
  }
  return (
    <div className='flex justify-between items-center px-2 bg-white w-full  h-20 rounded-md shadow-lg'>
      <div className=" w-full px-2">
<input type="search"  className=' w-full rounded-lg' placeholder='Search Products...'/>
      </div>
      <Link href='/dashboard/products/new' className=" bg-green-400 inline-flex text-white justify-center items-center w-[20%]  py-2 rounded-lg">
      Add Product
        {/* <Plus/>
    <Dailogbox
          title="Add Product"
          desc="Add Your Product"
          triger="Add Product"
          open={isDialogOpen}
          setOpen={setIsDialogOpen} // Use correct prop name
          BtnText="Close"
          onclick={() => setIsDialogOpen(false)} // Example onClick handler
        >
          <New/>
          </Dailogbox> */}
          
          </Link>
    </div>
  )
}

export default Page
