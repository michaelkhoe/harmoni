'use client';

import React from 'react';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from '../auth/hooks';

// Redirect to the dashboard page
// This is the main entry point for the application
export default function Home() {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();

  React.useEffect(() => {
    if (!loading) {
      if (authenticated) {
        router.push('/dashboard');
      } else {
        router.push('/auth/jwt/sign-in');
      }
    }
  }, [authenticated, loading, router]);

  return null;
}