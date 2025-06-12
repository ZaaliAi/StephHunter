
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      if (!auth) {
        console.error('Firebase auth is not initialized.');
        router.push('/admin/login');
        setLoading(false);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
          router.push('/admin/login');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div className="min-h-screen flex items-center justify-center"><p>Loading authentication...</p></div>;
    }

    if (!user) {
      // If not authenticated, the redirect will handle navigation.
      // Returning null prevents rendering the component before redirecting.
      return null;
    }
    
    // Pass the user object as a prop to the wrapped component
    return <WrappedComponent {...props} user={user} />;
  };
};

export default withAuth;
