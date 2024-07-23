'use client';

import { BarCharts } from '@/components/charts/Barchart';
import { PieCharts } from '@/components/charts/Piechart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import AdminCard from '@/components/cards/AdminCard';
import Dailogbox from '@/components/models/Dailogbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handlesubmit=()=>{
    alert("Hii")
  }
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (status === 'unauthenticated' || session?.user?.role !== 'ADMIN') {
      console.log('Redirecting, role:', session?.user?.role);
      router.push('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <AdminCard />
        <Dailogbox
          title="Alert"
          desc="This is an alert dialog."
          triger="Model"
          open={isDialogOpen}
          setOpen={setIsDialogOpen} // Use correct prop name
          BtnText="Close"
          onclick={() => setIsDialogOpen(false)} // Example onClick handler
        >
          <h1>
            <Button onClick={handlesubmit}>Testing Button</Button>
          <Button ><Link href={'/dashboard/products'}>Dashboard</Link></Button>
          </h1>
        </Dailogbox>
      </div>
    </>
  );
};

export default AdminPage;
