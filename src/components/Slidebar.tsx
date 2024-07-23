'use client';

import { BaggageClaim, BookOpen, Box, ClipboardList, Home, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';

interface SlidebarProps {
  toggleSidebar: () => void;
}

const Slidebar: React.FC<SlidebarProps> = ({ toggleSidebar }) => {
  return (
    <div className="h-full  fixed flex flex-col  w-full ">
      <button
        className="md:hidden p-4 absolute  right-0" 
        onClick={toggleSidebar}
        aria-label="Close Sidebar"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
  <div className=" text-center">Landson</div>
  <div className="mainlinks mt-14 px-9 text-sm ">
    <div className="   flex w-full flex-col gap-10 justify-center items-center">
      <div className=" px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
        <LayoutDashboard/>
        <Link href='/dashboard'>Dashboard</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
        <BaggageClaim/>
        <Link href='/dashboard/products'>Products</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
      <ClipboardList/>
        <Link href='/dashboard/orders'>Orders</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
        <Home/>
        <Link href='/dashboard/wherehouserequest'>Wherehouse</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
      <Box/>
        <Link href='/dashboard/categories'>Categories</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
        <BookOpen/>
        <Link href='/dashboard/blogs'>Blogs</Link>
      </div>
      <div className="px-14  gap-1 inline-flex   rounded-md py-3 text-white bg-green-400 links">
        <Settings/>
        <Link href='/dashboard/accountsettings'> Settings</Link>
      </div>
    </div>

  </div>
    </div>
  );
};

export default Slidebar;
