
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import withAuth from '@/auth/withAuth'; // Import the HOC
import { auth } from '@/lib/firebase'; // Import Firebase auth for sign-out
import { signOut } from 'firebase/auth'; // Import Firebase signOut method

function AdminDashboardPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    if (!auth) {
      console.error('Firebase auth is not initialized for sign out.');
      // Optionally, still try to redirect or show a generic error
      router.push('/admin/login');
      return;
    }
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out: ', error);
      alert('Sign out failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 mt-6">
        <h2 className="text-2xl font-bold mb-6">Welcome, Admin!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Manage Blog Posts</h3>
            <p className="text-muted-foreground mb-4">
              Create, edit, and delete blog posts.
            </p>
            {/* TODO: Link to actual blog management page e.g. /admin/blog */}
            <Link href="/admin/blog" passHref> {/* Updated Link */}
              <Button className="w-full">Go to Blog Management</Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-card text-card-foreground py-6 mt-12 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Admin Panel</p>
      </footer>
    </div>
  );
}

export default withAuth(AdminDashboardPage); // Apply the HOC
