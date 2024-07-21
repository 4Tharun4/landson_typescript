'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (status === 'unauthenticated' || session?.user?.role !== 'DEALER') {
      console.log('Redirecting, role:', session?.user?.role);
      router.push('/unauthorized'); 
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return <div>Admin Dashboard</div>;
};

export default AdminPage;
