'use client';

// Mock useAuthContext that always returns logged in state for development
export function useAuthContext() {
  return {
    user: {
      id: 'mock-user-id',
      email: 'user@example.com',
      displayName: 'Mock User',
      role: 'admin',
      accessToken: 'mock-token',
    },
    loading: false,
    authenticated: true,
    unauthenticated: false,
    checkUserSession: async () => {
      // Mock function that does nothing
    },
  };
} 