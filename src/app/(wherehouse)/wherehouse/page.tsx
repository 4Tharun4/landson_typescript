// pages/admin/index.tsx
'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WhereHouse = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.role !== 'WHEREHOUSE') {
        alert("your NOT WHEREHOUSE")
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return <p>Loading...</p>;
  }

  return <div>WhereHouse Dashboard</div>;
};

export default WhereHouse;
