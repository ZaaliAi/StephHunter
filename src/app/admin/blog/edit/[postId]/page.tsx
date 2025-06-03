
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Keep for Excerpt
import QuillEditor from '@/components/QuillEditor'; // Import the new QuillEditor
import withAuth from '@/auth/withAuth';
import PageHeader from '@/components/PageHeader'; // Correct import
import { db, auth } from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

interface BlogPostFormState {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  status: string;
}

function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.postId as string;

  const [post, setPost] = useState<BlogPostFormState | null>(null);
  const [initialSlug, setInitialSlug] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (str: string) => {
    return str.toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const fetchPost = useCallback(async () => {
    if (!postId) {
      setError('Post ID is missing.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const postDocRef = doc(db, 'blogPosts', postId);
      const postSnap = await getDoc(postDocRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setPost({
          title: postData.title || '',
          content: postData.content || '', // This will be HTML
          excerpt: postData.excerpt || '',
          slug: postData.slug || '',
          status: postData.status || 'published',
        });
        setInitialSlug(postData.slug || '');
      } else {
        setError('Blog post not found.');
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Failed to fetch blog post.');
    }
    setIsLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prev => (prev ? { ...prev, [name]: value } : null));
  };
  
  // Handler for Quill editor changes
  const handleContentChange = (value: string) => {
    setPost(prev => (prev ? { ...prev, content: value } : null));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPost(prev => (prev ? { 
      ...prev, 
      title: newTitle,
      slug: prev.slug === initialSlug || prev.slug === '' ? generateSlug(newTitle) : prev.slug
    } : null));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = generateSlug(e.target.value);
    setPost(prev => (prev ? { ...prev, slug: newSlug } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !postId) {
      setError('Post data or ID is missing.');
      return;
    }
    if (!post.title.trim() || !post.slug.trim() || !post.content.trim() || post.content === '<p><br></p>') {
      setError('Title, Slug, and Content are required.');
      return;
    }
    if (!auth.currentUser) {
      setError('You must be logged in to update a post.');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      const postDocRef = doc(db, 'blogPosts', postId);
      await updateDoc(postDocRef, {
        ...post,
        updatedAt: serverTimestamp(),
      });
      router.push('/admin/blog');
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="container mx-auto py-8 px-4"><p>Loading post data...</p></div>;
  if (error && !post) return <div className="container mx-auto py-8 px-4"><p className="text-destructive">Error: {error}</p></div>;
  if (!post && !isLoading) return <div className="container mx-auto py-8 px-4"><p>Blog post not found.</p></div>;
  if (!post) return null; // Should not happen if logic above is correct, but good for type safety


  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Edit Blog Post" />

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-md mt-6">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-card-foreground">Title</Label>
          <Input id="title" name="title" type="text" value={post.title} onChange={handleTitleChange} placeholder="Enter blog post title" className="mt-1" required />
        </div>

        <div>
          <Label htmlFor="slug" className="block text-sm font-medium text-card-foreground">Slug</Label>
          <Input id="slug" name="slug" type="text" value={post.slug} onChange={handleSlugChange} placeholder="post-slug-goes-here" className="mt-1" required />
          <p className="mt-1 text-xs text-muted-foreground">User-friendly URL. Auto-updated with title if not manually changed.</p>
        </div>

        <div>
          <Label htmlFor="excerpt" className="block text-sm font-medium text-card-foreground">Excerpt (Optional)</Label>
          <Textarea id="excerpt" name="excerpt" value={post.excerpt} onChange={handleInputChange} placeholder="Short summary of the blog post..." className="mt-1" rows={3} />
        </div>

        <div>
          <Label htmlFor="content" className="block text-sm font-medium text-card-foreground mb-1">Content</Label>
          {/* Conditionally render QuillEditor only when post data is available to avoid issues with initial undefined value */}
          {post && <QuillEditor value={post.content} onChange={handleContentChange} placeholder="Write your blog post content here..." />} 
        </div>

        <div>
          <Label htmlFor="status" className="block text-sm font-medium text-card-foreground">Status</Label>
          <select name="status" id="status" value={post.status} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-border focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-input text-foreground">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {error && <p className="text-sm text-destructive mt-2">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/blog')} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(EditBlogPostPage);
