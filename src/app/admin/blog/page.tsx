
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import withAuth from '@/auth/withAuth';
import PageHeader from '@/components/PageHeader'; // Changed import
import { db } from '@/lib/firebase'; // Import db instance
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
  Timestamp // Import Timestamp for date formatting
} from 'firebase/firestore';

// Interface for our blog post structure
interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  slug: string;
  createdAt: Timestamp | Date; // Firestore timestamp or Date object
  status?: string;
}

function AdminBlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const blogPostsCollection = collection(db, 'blogPosts');
    const q = query(blogPostsCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            slug: data.slug || '',
            createdAt: data.createdAt, // Keep as Firestore Timestamp or convert as needed
            status: data.status || 'draft',
          } as BlogPost;
        });
        setPosts(postsData);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching blog posts:', err);
        setError('Failed to fetch blog posts.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the post: "${postTitle}"?`)) {
      try {
        const postDocRef = doc(db, 'blogPosts', postId);
        await deleteDoc(postDocRef);
        // The onSnapshot listener will automatically update the UI
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  // Helper to format Firestore Timestamp or Date
  const formatDate = (dateValue: Timestamp | Date | undefined) => {
    if (!dateValue) return 'N/A';
    if (dateValue instanceof Timestamp) {
      return dateValue.toDate().toLocaleDateString();
    }
    return (dateValue as Date).toLocaleDateString(); // Cast if it's already a Date
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Manage Blog Posts" />

      <div className="mb-6 text-right">
        <Link href="/admin/blog/new" passHref>
          <Button>Add New Post</Button>
        </Link>
      </div>

      {isLoading && <p>Loading posts...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {!isLoading && !error && posts.length === 0 && (
        <p className="text-muted-foreground">No blog posts found. Get started by adding one!</p>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="bg-card shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm font-medium text-foreground hover:text-primary">
                      <Link href={`/admin/blog/edit/${post.id}`}>{post.title}</Link>
                    </div>
                    {post.excerpt && <div className="text-xs text-muted-foreground truncate max-w-xs">{post.excerpt}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/blog/edit/${post.id}`} className="text-primary hover:underline mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default withAuth(AdminBlogManagementPage);
