// import { api } from './api';
// import { redirect } from 'next/navigation';

// export const checkAuthStatus = async () => {
//   try {
//     const response = await api.checkAuth();
//     return response.isAuthenticated;
//   } catch (error) {
//     console.error('Auth check failed:', error);
//     return false;
//   }
// };

// export const requireAuth = async () => {
//   const isAuthenticated = await checkAuthStatus();
//   if (!isAuthenticated) {
//     redirect('/login');
//   }
// };




import { api } from './api';
import { redirect } from 'next/navigation';

export const checkAuthStatus = async () => {
  try {
    const isAuthenticated = await api.checkAuth();
    return isAuthenticated; // Now correctly returns a boolean
  } catch (error) {
    console.error('Auth check failed:', error);
    return false; // Default to false if an error occurs
  }
};

export const requireAuth = async () => {
  const isAuthenticated = await checkAuthStatus();
  if (!isAuthenticated) {
    redirect('/login');
  }
};
