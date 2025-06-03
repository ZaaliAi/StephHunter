
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase'; // Using the path alias @
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      if (!auth) {
        // This case will be hit if Firebase is not correctly initialized in src/lib/firebase.ts
        console.error(
          'Firebase auth is not initialized. Please check your Firebase configuration in src/lib/firebase.ts'
        );
        // Redirect to login as a fallback, but the primary issue is Firebase setup.
        router.push('/admin/login');
        setLoading(false);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          // TODO: Add role-based access control here if you need to ensure the user is an admin.
          // For example, you might check a custom claim or a Firestore document.
          setIsAuthenticated(true);
        } else {
          // User is signed out.
          setIsAuthenticated(false);
          router.push('/admin/login');
        }
        setLoading(false);
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    if (loading) {
      return <div className="min-h-screen flex items-center justify-center"><p>Loading authentication...</p></div>;
    }

    // Only render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
    // If not authenticated, the redirect in useEffect will have already triggered.
    // Returning null here prevents rendering the component briefly before redirect.
  };
};

export default withAuth;
