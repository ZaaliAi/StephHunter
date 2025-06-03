
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Keep for Excerpt
import QuillEditor from '@/components/QuillEditor'; // Import the new QuillEditor
import withAuth from '@/auth/withAuth';
import PageHeader from '@/components/PageHeader'; // Correct import
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function AddNewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Quill will manage HTML content
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  // Handler for Quill editor changes
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // More detailed validation
    if (typeof title !== 'string' || title.trim() === '') {
 setError('Title is required.');
 setIsLoading(false);
 return;
    }

    if (typeof slug !== 'string' || slug.trim() === '') {
 setError('Slug is required.');
 setIsLoading(false);
 return;
    }

    // Check if content is a string and not just the default empty paragraph from Quill
 if (typeof content !== 'string' || content.trim() === '' || content === '<p><br></p>') {
 setError('Content is required.');
 setIsLoading(false);
 return;
    }

    if (typeof excerpt !== 'string') {
      // Although optional, ensure it's a string if provided
      setError('Invalid excerpt format.');
 setIsLoading(false);
      setError('Title, Slug, and Content are required.');
      setIsLoading(false);
      return;
    }

    if (!auth.currentUser) {
      setError('You must be logged in to create a post.');
      setIsLoading(false);
      return;
    }

    console.log('Current user:', auth.currentUser); // Log the current user

    try {
      const blogPostsCollection = collection(db, 'blogPosts');
      await addDoc(blogPostsCollection, {
        title: title,
        content: content, // This will now be HTML from Quill
        excerpt: excerpt,
        slug: slug,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || auth.currentUser.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'published',
      });

      router.push('/admin/blog');
    } catch (err) {
      console.error('Error submitting blog post:', err);
      setError('Failed to submit blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader title="Add New Blog Post" />

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-md mt-6">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-card-foreground">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter blog post title"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="slug" className="block text-sm font-medium text-card-foreground">Slug</Label>
          <Input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            placeholder="auto-generated-from-title"
            className="mt-1"
            required
          />
           <p className="mt-1 text-xs text-muted-foreground">User-friendly URL. Auto-generated but can be edited.</p>
        </div>

        <div>
          <Label htmlFor="excerpt" className="block text-sm font-medium text-card-foreground">Excerpt (Optional)</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary of the blog post..."
            className="mt-1"
            rows={3}
          />
          <p className="mt-1 text-xs text-muted-foreground">A brief summary that might be shown in post listings.</p>
        </div>

        <div>
          <Label htmlFor="content" className="block text-sm font-medium text-card-foreground mb-1">Content</Label>
          <QuillEditor 
            value={content} 
            onChange={handleContentChange} 
            placeholder="Write your blog post content here..."
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddNewBlogPostPage);
