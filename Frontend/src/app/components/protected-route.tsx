'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuthStatus } from '@/utils/authUtils';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      if (!isAuthenticated) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};
