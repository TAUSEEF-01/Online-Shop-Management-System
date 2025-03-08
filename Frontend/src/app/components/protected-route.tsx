// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { checkAuthStatus } from '@/utils/authUtils';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const isAuthenticated = await checkAuthStatus();
//       console.log('isAuthenticated:', isAuthenticated);
//       if (!isAuthenticated) {
//         router.push('/login');
//       }
//     };

//     checkAuth();
//   }, [router]);

//   return <>{children}</>;
// };

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuthStatus } from "@/utils/authUtils";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await checkAuthStatus();
      console.log("isAuthenticated:", isAuthenticated);

      if (!isAuthenticated) {
        router.push("/login");
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return <>{children}</>;
}
